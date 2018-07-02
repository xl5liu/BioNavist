var nodes = [];
var links = [];
var categories = [];
var json = require('./convertcsv.json');


function findIndex(string, arr){
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i].id === string){
			return i;
		}
	}
	return -1;
}
function findNode(string, num, arr){
	for (var i = arr.length - 1; i >= 0; i--) {
		if((arr[i].name === string)&&(arr[i].group === num)){
			return i;
		}
	}
	return -1;
}
function findLink(x, y, arr){
	for (var i = arr.length - 1; i >= 0; i--) {
		if((arr[i].source === x) && (arr[i].target === y)){
			return 1;
		}
	}
	return -1;
}

// console.log(json[0]["Box 1"]);

for(relation in json){
	var catBox1 = json[relation]["Cat Box 1"];
	var catBox2 = json[relation]["Cat Box 2"];
	var box1 = json[relation]["Box 1"];
	var box2 = json[relation]["Box 2"];

	var categories1Index = findIndex(catBox1, categories);
	if((categories1Index === -1)&&(catBox1 != '')&&(catBox1 != 'N/A')){
		categories.push({"id":catBox1});
		categories1Index = findIndex(catBox1, categories);
	}

	var categories2Index = findIndex(catBox2, categories);
	if((categories2Index === -1)&&(catBox2 != '')&&(catBox2 != 'N/A')){
		categories.push({"id":catBox2});
		categories1Index = findIndex(catBox2, categories);	
	}

	var sourceIndex = findNode(box1, categories1Index, nodes);
	if((sourceIndex === -1)&&(box1 != '')&&(box1 != 'N/A')&&(categories1Index != -1)){
		nodes.push({"name":box1, "group":categories1Index});
		sourceIndex = findIndex(box1, nodes);
	}


	var targetIndex = findNode(box2, categories2Index, nodes);
	if((targetIndex === -1)&&(box2 != '')&&(box2 != 'N/A')&&(categories2Index != -1)){
		nodes.push({"name":box2, "group":categories2Index});
		targetIndex = findIndex(box2, nodes);
	}

	if((findLink(sourceIndex, targetIndex, links) === -1)&&(sourceIndex != -1)&&(targetIndex != -1)){
		links.push({ "source" :sourceIndex, "target" :targetIndex});
	}

}

console.log(categories);