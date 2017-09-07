let lessons = require("../../processedData/2017_2/parsedLessons");
let fs = require("fs");

//courseSectionsParser : reads lessons from a JSON file, and then process 
//data in lessons to create courseSections data and write it in a JSON file.

let myMap = new Map();
let courseSections = [];
for (let lesson of lessons) {
	let courseSectionName = String(lesson.code + "-" + lesson.section);
	if (myMap.get(courseSectionName) === undefined) {
		courseSections.push({
			id: myMap.size,
			events: [],
			teachers: [],
			mask: [0, 0, 0],
			name: lesson.section,
			code: lesson.code
		});
		myMap.set(courseSectionName, myMap.size);
	}
	let pointer = myMap.get(courseSectionName);
	let day = 0;
	switch (lesson.day) {
		case "LU":
			day = 1;
			break;
		case "MA":
			day = 2;
			break;
		case "MI":
			day = 3;
			break;
		case "JU":
			day = 4;
			break;
		case "VI":
			day = 5;
			break;
		case "SA":
			day = 6;
			break;
	}
	//We are storing course-sections events in an array of bitmasks.
	//This array is of size 3, as we have 6 days we are storing each 2 days
	//in each bitmask.
	let zeroBasedDay = day - 1;
	let positionMask = zeroBasedDay >> 1;

	for (let hour = lesson.beginHour; hour < lesson.endHour; hour++) {
		courseSections[pointer].events.push({ day: day, hour: hour });
		let posBit = hour - 8; //posBit represents a relative position from hours.
		if (zeroBasedDay & 1) posBit += 14; //every second element needs to be displacement.
		courseSections[pointer].mask[positionMask] |= 1 << posBit;
	}
	courseSections[pointer].teachers.push(lesson.teacher);
	//We need to discard repeated list of teachers names.
	courseSections[pointer].teachers = [
		...new Set(courseSections[pointer].teachers)
	];
}

setTimeout(() => {
	fs.writeFileSync(
		"../../processedData/2017_2/parsedCourseSections.json",
		JSON.stringify(courseSections),
		"utf-8"
	);
}, 1500);
