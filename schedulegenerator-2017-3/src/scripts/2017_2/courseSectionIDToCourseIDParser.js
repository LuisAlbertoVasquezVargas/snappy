let courses = require("../../processedData/2017_2/parsedCourses");
let courseSections = require("../../processedData/2017_2/parsedCourseSections");
let fs = require("fs");

let courseSectionIDToCourseID = Array(courseSections.length);
let myMap = new Map();
for (let course of courses) {
  myMap.set(course.code, myMap.size);
}
for (let [courseSectionId, courseSection] of Object.entries(
  courseSections
)) {
  let courseId = myMap.get(courseSection.code);
  courseSectionIDToCourseID[courseSectionId] = courseId;
}

setTimeout(() => {
	fs.writeFileSync(
		"../../processedData/2017_2/parsedCourseSectionIDToCourseID.json",
		JSON.stringify(courseSectionIDToCourseID),
		"utf-8"
	);
}, 1500);