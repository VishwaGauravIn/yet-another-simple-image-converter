let imgLoaded = false;

const fileInput = document.getElementById("file_selector");

function selFile() {
  fileInput.click();
}

function fileSelected() {
  if (fileInput.files.length !== 0) {
    const [file] = fileInput.files;
    document.getElementById("prevImg").src = URL.createObjectURL(file);
  }
}
