let pdfreader = require("pdfreader");
let fs = require("fs");

const EPS = 0.3;
const start = 4;

let tokens = []; // indexed by y-position
let line = 0;
let lessons = [];

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

function printRows() {
	//Sort tokens by y
	tokens.sort((a, b) => {
		return a.y - b.y;
	});
	//Here groupyng elements by row, as we know we have
	//very small distortion in x,y relative positions of texts
	//so we need to consider neighboors nearby.
	for (let i = 0; i < tokens.length; i++) {
		let ind = i;
		for (let j = i; j < tokens.length; j++) {
			if (Math.abs(tokens[j].y - tokens[i].y) < EPS) {
				ind = j;
			} else break;
		}
		let array = [];
		for (let j = i; j <= ind; j++)
			array.push({
				x: tokens[j].x,
				text: tokens[j].text
			});

		array.sort((a, b) => {
			return a.x - b.x;
		});
		//console.log(array);
		let items = array.map(elm => elm.text);
		if (line >= start && items.length >= 9 ) {
			lessons.push(getLesson(items));
		}
		i = ind;
		line++;
	}
}

new pdfreader.PdfReader().parseFileItems(
	"../../rawData/2016_2/lessons.pdf",
	function(err, item) {
		if (!item || item.page) {
			// end of file, or page
			printRows();
			tokens = []; // clear rows for next page
		} else if (item.text) {
			tokens.push(item);
		}
	}
);

setTimeout(() => {
	fs.writeFileSync(
		"../../processedData/2016_2/parsedLessons.json",
		JSON.stringify(lessons),
		"utf-8"
	);
}, 3500);
