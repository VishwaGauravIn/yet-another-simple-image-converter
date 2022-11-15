// Constants
const fileInput = document.getElementById("file_selector");
const fileName = document.getElementById("filename");
const prevImg = document.getElementById("prevImg");
const inpWidth = document.getElementById("width");
const inpHeight = document.getElementById("height");

// Variables
let realWidth = prevImg.clientWidth;
let realHeight = prevImg.clientHeight;
let format = "png";

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
    setTimeout(() => {
      realWidth = prevImg.clientWidth;
      realHeight = prevImg.clientHeight;
      // setting height and width input value
      inpHeight.value = realHeight;
      inpWidth.value = realWidth;
    }, 100);
  }
}

function onWChange() {
  inpHeight.value = (inpWidth.value / realWidth) * realHeight;
}

function onHChange() {
  inpWidth.value = (inpHeight.value / realHeight) * realWidth;
}

function changeFormat(f) {
  format = f;
}

function downloadFile() {
  if (inpHeight.value > 8000 || inpWidth.value > 8000) {
    alert("Height or Width can not be greater than 8000px");
  } else {
    imgConverter(
      prevImg.src,
      realWidth,
      realHeight,
      format,
      inpHeight.value / realHeight
    ).then((dataUri) => {
      const a = document.createElement("a");
      a.href = dataUri;
      a.style.display = "none";
      a.download = fileName.value + "." + format || "spiffy" + "." + format;
      a.click();
    });
  }
}

// via: https://www.npmjs.com/package/image-converter-pro
const imgConverter = (
  Dataurl,
  width = 500,
  height = 500,
  format = "png",
  scale = 1
) =>
  new Promise((resolve, reject) => {
    let canvas;
    let ctx;
    let img;

    img = new Image();
    img.src = Dataurl;
    img.onload = () => {
      canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        width * scale,
        height * scale
      );

      img = new Image();
      img.src = canvas.toDataURL(`image/${format}`);
      img.onload = () => {
        canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL(`image/${format}`));
      };
    };
  });
