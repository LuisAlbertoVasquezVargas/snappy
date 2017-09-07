In order to pre-calculate processedData from rawData we execute the file lessonsParser.js in scripts per every semester.
Execute in their directory as follows :  
  node pdfToJsonParser.js 
This will take lessons.pdf and parse it in to json format and write it in parsedLessons.json.

TODO(luisvasquez): investigate how to parseLessons
in 2016-3, for now will just leave lessons parsed data in parsedLessons.json, for now we are just fixing it manually.

TODO(luisvasquez): try to recover data from
2011_3 Sistemas y tecnología.

TODO(luisvasquez): use chai assertions for pdf lessons parsers.

Lessons parser brief summary
	lessons2012_2	excelParser
	lessons2015_1	excelParser
	lessons2015_2	excelParser
	lessons2016_1	pdfParser
	lessons2016_2	pdfParser
	lessons2016_3	------
	lessons2017_1	pdfParser
	lessons2017_2	pdfParser

//TODO(luisvasquez) : generate better colour pallete.
//TODO(luisvasquez) : to add description to courseSectionsParser.
//TODO(luisvasquez) : to improve automation of generate parsedCourses, considering calculating Open and id from lessons.
//TODO(luisvasquez) : erase unnecessary setTimeouts on parsers due to writeFileSync.
//TODO(luisvasquez) : erase all Array.fill for safety reasons.