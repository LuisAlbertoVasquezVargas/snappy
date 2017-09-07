let pdfreader = require("pdfreader");
let fs = require("fs");

const EPS = 0.6;
const start = 1;

let tokens = []; // indexed by y-position
let line = 0;
let lessons = [];

function getLesson(items) {
	return {
		code: items[0],
		section: items[1],
		name: items[2],
		type: items[3],
		day: items[4],
		beginHour: Number(items[5]),
		endHour: Number(items[6]),
		room: items[7],
		teacher: items[8]
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

		let items = array.map(elm => elm.text);
		if (line >= start) {
			lessons.push(getLesson(items));
		}
		i = ind;
		line++;
	}
}

new pdfreader.PdfReader().parseFileItems(
	"../../rawData/2017_2/lessons.pdf",
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
		"../../processedData/2017_2/parsedLessons.json",
		JSON.stringify(lessons),
		"utf-8"
	);
}, 3500);
