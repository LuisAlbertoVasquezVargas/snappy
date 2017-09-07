import React, { Component } from "react";
import Timetables from "./components/Timetables/Timetables";
import CareerForm from "./components/CareerForm/CareerForm";

import scheduleGenerator from "./utils/scheduleGenerator";
import colors from "./processedData/misc/colorsPalette";
import courses from "./processedData/2017_2/parsedCourses";
import courseSectionIDToCourseID from "./processedData/2017_2/parsedCourseSectionIDToCourseID";
import courseSections from "./processedData/2017_2/parsedCourseSections";

//Default search parameters.
let input = {
  minCredits: 1,
  minCourses: 1,
  maxCredits: 30,
  maxCourses: 13,
  maxIterations: 4000,
  courses: []
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false
    };
    this.activateTimetables = this.activateTimetables.bind(this);
  }
  activateTimetables(selectedCourses) {
    selectedCourses.forEach((key, index) => {
      if (key) {
        let course = {
          id: index,
          credits: courses[index].credits,
          mustBeChosen: false,
          sections: []
        };
        for (let [courseSectionID, courseID] of Object.entries(
          courseSectionIDToCourseID
        )) {
          if (courseID === index) {
            course.sections.push({
              mask: courseSections[courseSectionID].mask,
              id: courseSectionID
            });
          }
        }
        input.courses.push(course);
      }
    });
    this.setState({
      isActivated: true
    });
  }

  render() {
    let scheduleGeneratorOuput = scheduleGenerator.generate(input);
    //Sort solutions for number of courseSections.(More courseSections first).
    scheduleGeneratorOuput.courseSectionIDsPerSolution.sort((solA, solB) => {
      if (solA.length == solB.length) return 0;
      if (solA.length < solB.length) return 1;
      return -1;
    });
    //Assigning diferent colors to each course ids, first search all courseSections
    //and then obtain their courseIDs and then save them with a map.
    //console.log(scheduleGeneratorOuput);
    let courseIDToColor = new Map();
    let colorPointer = 0;
    for (let courseSectionIDsPerSolution of scheduleGeneratorOuput.courseSectionIDsPerSolution)
      for (let courseSectionIDs of courseSectionIDsPerSolution)
        if (!courseIDToColor.get(courseSectionIDToCourseID[courseSectionIDs]))
          courseIDToColor.set(
            courseSectionIDToCourseID[courseSectionIDs],
            colorPointer++
          );

    let numTimetables =
      scheduleGeneratorOuput.courseSectionIDsPerSolution.length;
    let timetables = Array(numTimetables).fill({});

    for (let index of Object.keys(timetables)) {
      let solution = scheduleGeneratorOuput.courseSectionIDsPerSolution[index];
      //Updating weeklyBoard
      let weeklyBoard = [];
      for (let h = 8; h <= 21; h++) {
        let row = Array(7).fill({});
        row[0] = {
          value: (h <= 12 ? h : h - 12) + ":00 " + (h <= 12 ? "a" : "p") + ".m"
        };
        weeklyBoard.push(row);
      }
      for (let courseSectionID of solution) {
        let events = courseSections[courseSectionID].events;
        for (let event of events) {
          let column = event.day;
          let row = event.hour - 8;
          let courseID = courseSectionIDToCourseID[courseSectionID];
          weeklyBoard[row][column] = {
            value:
              courses[courseID].code +
              "-" +
              courseSections[courseSectionID].name,
            color: colors[courseIDToColor.get(courseID)]
          };
        }
      }
      //Updating detail.
      let detail = [];
      let numCredits = 0;
      for (let courseSectionID of solution) {
        let row = [];
        let courseID = courseSectionIDToCourseID[courseSectionID];
        row.push({
          value:
            courses[courseID].code + "-" + courseSections[courseSectionID].name,
          color: colors[courseIDToColor.get(courseID)]
        });
        row.push({
          value: courses[courseID].name,
          color: colors[courseIDToColor.get(courseID)]
        });
        row.push({
          value: courseSections[courseSectionID].teachers.join("/"),
          color: colors[courseIDToColor.get(courseID)]
        });
        numCredits += courses[courseID].credits;
        detail.push(row);
      }

      timetables[index] = {
        weeklyBoard: weeklyBoard,
        detail: detail, //Can be courseSectionDetail
        numCredits: numCredits,
        numCourses: solution.length,
        numSolutions: scheduleGeneratorOuput.numSolutions,
        numPresented: numTimetables,
        executionTime: scheduleGeneratorOuput.executionTime
      };
    }
    return (
      <div>
        <CareerForm
          activateTimetables={this.activateTimetables}
          activated={this.state.isActivated}
        />
        <Timetables
          activated={this.state.isActivated}
          timetables={timetables}
        />
      </div>
    );
  }
}

export default App;
