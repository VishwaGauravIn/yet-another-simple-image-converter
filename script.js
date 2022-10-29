// Constants
const fileInput = document.getElementById("file_selector");
const fileName = document.getElementById("filename");
const prevImg = document.getElementById("prevImg");
const inpWidth = document.getElementById("width");
const inpHeight = document.getElementById("height");

// Variables
let realWidth = prevImg.naturalWidth;
let realHeight = prevImg.naturalHeight;

function selFile() {
  fileInput.click();
}

function fileSelected() {
  if (fileInput.files.length !== 0) {
    // Selecting the first file
    const [file] = fileInput.files;
    // removing the file extension from name
    fileName.value = file.name.replace(/\.[^.]*$/, "");
    // setting file name
    prevImg.src = URL.createObjectURL(file);
    // updating new height and width
    realWidth = prevImg.naturalWidth;
    realHeight = prevImg.naturalHeight;
    // setting height and width input value
    inpHeight.value = realHeight;
    inpWidth.value = realWidth;
  }
}
