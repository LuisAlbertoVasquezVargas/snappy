let assert = require("chai").assert;
let fs = require("fs");
let XLSX = require("xlsx");
let workbook = XLSX.readFile("../../rawData/2012_2/lessons.xlsx");
let sheet_name_list = workbook.SheetNames;

function getLesson(items) {
	return {
		Code: items[0],
		Section: items[1],
		Name: items[2],
		Type: items[3],
		Day: items[4],
		BeginHour: Number(items[5]),
		EndHour: Number(items[6]),
		Room: items[7],
		Teacher: items[8]
	};
}

//This procedure checks every 12 cells for all rows.
let columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
let lessons = [];
for (let rows = 3; rows <= 542; rows++) {
	let tempArray = [];
	for (let cols of columns) {
		let cellAddress = cols + rows;
		let cellStructure = workbook.Sheets[sheet_name_list[0]][cellAddress];
		assert.isTrue(
			cellStructure === undefined ||
				cellStructure["t"] == "s" ||
				cellStructure["t"] == "n",
			"cell has unknown type"
		);
		tempArray.push(cellStructure ? String(cellStructure["v"]) : "");
	}
	let items = Array(9);
	items[0] = tempArray[0] + "-" + tempArray[1];
	items[1] = tempArray[2];
	items[2] = tempArray[3];
	items[3] = tempArray[4];
	items[4] = tempArray[5];
	items[5] = tempArray[6];
	items[6] = tempArray[7];
	items[7] = tempArray[8];
	items[8] = tempArray[9] + " " + tempArray[10] + ", " + tempArray[11];
	lessons.push(getLesson(items));
}
setTimeout(() => {
	fs.writeFileSync(
		"../../processedData/2012_2/parsedLessons.json",
		JSON.stringify(lessons),
		"utf-8"
	);
}, 2500);
