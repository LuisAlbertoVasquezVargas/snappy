let fs = require("fs");
let assert = require("chai").assert;
let courses = require("../../processedData/2017_2/parsedCourses");
let _ = require("underscore");

//Calculates information about courses names and store it in a JSON file.

const coursesByCareer = _.range(2).map(() => {
	return _.range(11).map(() => {
		return [];
	});
});

for (let course of courses) {
	if (!course.open) continue;
	let i1Semester = course.i1Semester;
	if (course.i1Semester === null) i1Semester = -1;
	else if (
		course.i1Semester === "EE" ||
		course.i1Semester === "ES" ||
		course.i1Semester === "LE"
	)
		i1Semester = 0;
	else {
		assert.isTrue(typeof course.i1Semester === "number");
	}
	if (i1Semester >= 0) {
		coursesByCareer[0][i1Semester].push({
			code: course.code,
			name: course.name,
			credits: course.credits,
			evaluationSystem: course.evaluationSystem,
			i1Type: course.i1Type,
			id: course.id
		});
	}
}

for (let course of courses) {
	if (!course.open) continue;
	let i2Semester = course.i2Semester;
	if (course.i2Semester === null) i2Semester = -1;
	else if (
		course.i2Semester === "EE" ||
		course.i2Semester === "ES" ||
		course.i2Semester === "LE"
	)
		i2Semester = 0;
	else {
		assert.isTrue(typeof course.i2Semester === "number");
	}
	if (i2Semester >= 0) {
		coursesByCareer[1][i2Semester].push({
			code: course.code,
			name: course.name,
			credits: course.credits,
			evaluationSystem: course.evaluationSystem,
			i2Type: course.i2Type,
			id: course.id
		});
	}
}

fs.writeFileSync(
	"../../processedData/2017_2/parsedCourseNamesByCareer.json",
	JSON.stringify(coursesByCareer),
	"utf-8"
);
