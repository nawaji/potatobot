//splits the message using " "s and returns the element specified
//Input: string/object "str", integer "index"
//Output: blank if blank string, otherwise send the string

function split_args(str, index) {
	//return if blank string
	if (str == "") {
		return "";
	}

	//string object
	var temp = String(str).split(" ");

	//let user know if index is out of range
	if (index < 0 || index >= temp.length) {
//		console.log("Out of range!");
		return "";
	}

	//return the specified string
	return temp[index];
}

module.exports = split_args;