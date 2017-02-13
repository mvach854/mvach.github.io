//
// The function that computes stats on a given text
//
function getStats(txt) {
    return {
        nChars: txt.length,
        nWords: calcNWords(txt),
        nLines: calcNLines(txt),
        nNonEmptyLines: calcNNonEmptyLines(txt),
     //  averageWordLength: 3.3,
     //  maxLineLength: 33,
     //  palindromes: ["12321", "kayak", "mom"],
     //  longestWords: ["xxxxxxxxx", "123444444"],
     //  mostFrequentWords: ["hello(7)", "world(1)"]
    };
}

// nWords
function calcNWords(txt) {
	let alphaNum = txt.replace(/[^a-z0-9]/ig, " ");
	let splitWords = alphaNum.split(/\s+/).filter(Boolean); // get rid of empty string entries
	return splitWords.length;
}

// nLines
function calcNLines(txt) {
	let nLines = txt.split("\n");
	if (nLines.length === 1) { // in the case of the text being empty
		if (nLines[0] === "") {
			nLines.pop()
		}
	}
	return nLines.length;
}

function calcNNonEmptyLines(txt) {
	let nLines = txt.split("\n");
		console.log(nLines);

	let nNonEmptyLines = nLines.filter(function(arr) {
		return /\S/.test(arr);
	});
	console.log(nNonEmptyLines);
	return nNonEmptyLines.length;
}