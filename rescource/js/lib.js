

var jsArray2PhpArray = function(jsArray) {

    // Convert JS array to PHP array format
    return JSON.stringify(jsArray)
            .replace(/"(\w+)"\s*:/g, '$1:')
            .replace(/"/g, '\'');
}


var extractValuesInParentheses = function(inputString) {
  const regex = /\(([^)]+)\)/;
  const matches = inputString.match(regex);

  // Check if there are any matches
  if (matches && matches.length > 1) {
    // Extracted values are in the second element of the 'matches' array
    const valuesInParentheses = matches[1];
    return valuesInParentheses;
  } else {
    // Return null or handle the case when no values are found in parentheses
    return null;
  }
}

// Example usage:
const inputString = "This is a string with (some values) in parentheses.";
const extractedValues = extractValuesInParentheses(inputString);

console.log(extractedValues);
