"use strict";

function readFile(file, callback) {
  let reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (evt) => {
    console.log("Read file of length", evt.target.result.length);
    callback(evt.target.result);
  };
  reader.onerror = (evt) => {
    console.err("Error reading file", file);
  };
}


function handleUpload(elementId) {
  let file = document.getElementById(elementId).files[0];
  readFile(file, function (data) {
    let parsed = Papa.parse(data);
    if (parsed.errors.length != 0) {
      console.err("Error parsing CSV", parsed.errors);
      return;
    }
    console.log("Parsed CSV successful, with", parsed.data.length, "rows, and with metadata", parsed.meta);
    console.log("Data:", parsed.data);
  });
}
