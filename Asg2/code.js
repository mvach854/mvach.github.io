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
        longestWords: findLongestWords(txt),
        mostFrequentWords: findMostFrequentWords(txt)
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

// nNonEmptyLines
function calcNNonEmptyLines(txt) {
	let nLines = txt.split("\n");
	let nNonEmptyLines = nLines.filter(function(arr) {
		return /\S/.test(arr);
	});
	return nNonEmptyLines.length;
}

// averageWordLength
function calcAverageWordLength(txt) {
	let words = calcNWords(txt);
	let totalLength = 0;
	for (let i = 0; i < words.length; i++) {
		totalLength += words[i].length;
	}
	return totalLength / words.length;
}

// maxLineLength
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

// return unique words in lowercase format
function uniqueWords(txt) {
	let words = calcNWords(txt);
	
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].toLowerCase();
	}
	
	let uniqueWords = words.filter(function(word, i) { // remove any duplicates
		return words.indexOf(word) === i;
	});
	
	return uniqueWords;
}

// palindromes
function findPalindromes(txt) {
	let unique = uniqueWords(txt);
	let palindromes = [];
	
	let wordsOver2 = unique.filter(function(word) { // remove any words 2 characters or less
		return word.length > 2;
	});

	for (let i = 0; i < wordsOver2.length; i++) {
		let reversedWord = wordsOver2[i].split("").reverse().join("");
		if (wordsOver2[i] === reversedWord) {
			palindromes.push(wordsOver2[i]);
		}
	}
	return palindromes;
}

// longestWords
function findLongestWords(txt) {
	let unique = uniqueWords(txt);
	
	unique.sort();
	unique.sort(function(a,b) {
		return b.length - a.length; // sort a before b by length, but if they are equal,
	});	
	return unique.slice(0,10);
}

// mostFrequentWords
function findMostFrequentWords(txt) {
	let allWords = calcNWords(txt);
	let mostFrequent = [];
	
	for (let i = 0; i < allWords.length; i++) { // make all lowercase
		allWords[i] = allWords[i].toLowerCase();
	}
	
	let unique = uniqueWords(txt); // a list of only one of each word

	let frequency = 0;
	for (let i = 0; i < unique.length; i++) {
		for (let j = 0; j < allWords.length; j++) {
			if (unique[i] === allWords[j]) {
				frequency++;
			}
		}
		mostFrequent.push({
			word: unique[i],
			count: frequency
		});
		frequency = 0;
	}
	
	mostFrequent.sort(function(a,b) {
		if (a.count === b.count) {
			return a.word > b.word;
		} else {
			return a.count < b.count;
		}
	}); // most frequent words sorted by frequency
	console.log(mostFrequent);
	//mostFrequent = mostFrequent.sort(function(a,b) {
//		return a.word > b.word;
	//}); // most frequent words in alphabetical order
	//	console.log(mostFrequent);

	return mostFrequent.slice(0,10).map(function(a) {
		return a.word + "(" + a.count + ")"
	});
}