/*
INPUT
minCredits : Minimum number of credits. 
minCourses : Minimum number of courses.
maxCredits : Maximum number of credits.
maxCourses : Maximum number of courses.
numberOfSolutionsThreshold : Number that limits the number of solutions to store.
courses: Array that contains information of courses.
	id : UUID of a given course.
	credits : Number of credits.
	mustBeChosen : Boolean which states if a course has to be stricly
						chosen or not.
	sections : Array that contains information of selected sections from 
		a given course.
		id : UUID of a given course-section.
		mask : Array of integer wich contains 3 integers whose represents time used
			for a given course-section in a week.
*/

/*
OUTPUT
courseSectionIDsPerSolution : Array of array of integers, is contains a list
								of course-section UUIDs per solution.
numSolutions : Total number of solutions of a given scenary.
executionTime : Total number of nano-seconds the search took place.
*/

function createNewCopy(original) {
	return JSON.parse(JSON.stringify(original));
}

exports.generate = function(input) {
	let output = {
		courseSectionIDsPerSolution: []
	};

	let numSolutions = 0;
	let curentSolution = []; //Stores course-section IDs of a curent solution.

	const startTime = window.performance.now();
	function back(/**/) {
		//Commented code.
		//Sorry dude.
	}
	back(/**/);
	const endTime = window.performance.now();
	output.numSolutions = numSolutions;
	output.executionTime = (endTime - startTime).toFixed(3);

	return output;
};
