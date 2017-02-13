//
// The function that computes stats on a given text
//
function getStats(txt) {
    return {
        nChars: txt.length,
        nWords: calcNWords(txt).length,
        nLines: calcNLines(txt),
        nNonEmptyLines: calcNNonEmptyLines(txt),
        averageWordLength: calcAverageWordLength(txt),
        maxLineLength: calcMaxLineLength(txt),
        palindromes: findPalindromes(txt),
     //  longestWords: ["xxxxxxxxx", "123444444"],
     //  mostFrequentWords: ["hello(7)", "world(1)"]
    };
}

// nWords
function calcNWords(txt) {
	let alphaNum = txt.replace(/[^a-z0-9]/ig, " ");
	let splitWords = alphaNum.split(/\s+/).filter(Boolean); // get rid of empty string entries
	return splitWords;
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
	let nNonEmptyLines = nLines.filter(function(arr) {
		return /\S/.test(arr);
	});
	return nNonEmptyLines.length;
}

function calcAverageWordLength(txt) {
	let words = calcNWords(txt);
	let totalLength = 0;
	for (let i = 0; i < words.length; i++) {
		totalLength += words[i].length;
	}
	return totalLength / words.length;
}

function calcMaxLineLength(txt) {
	let lines = txt.split("\n");
	let longest = 0;
	
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].length > longest) {
			longest = lines[i].length;
		}
	}
	return longest;
}

function findPalindromes(txt) {
	let words = calcNWords(txt);
	let palindromes = [];
	
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].toLowerCase();
	}
	let wordsOver2 = words.filter(function(word) { // remove any words 2 characters or less
		return word.length > 2;
	});
	let uniqueWordsOver2 = wordsOver2.filter(function(word, i) { // remove any duplicates
		return wordsOver2.indexOf(word) === i;
	});
	for (let i = 0; i < uniqueWordsOver2.length; i++) {
		let reversedWord = uniqueWordsOver2[i].split("").reverse().join("");
		if (uniqueWordsOver2[i] === reversedWord) {
			palindromes.push(uniqueWordsOver2[i]);
		}
	}
	return palindromes;
}