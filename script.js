// ========
// Pixels - start
// ========
// Element Selection
let pixelContainer = document.querySelector(".grid-container");
let slider = document.querySelector(".slider");
let pixelDimension = 50;
let noOfpixels;
let pixelBoxes;

// Initial Grid
createGrid(pixelDimension);

// Change Grid when Slider value change
slider.addEventListener("input", () => {
  pixelDimension = slider.value;
  createGrid(pixelDimension);
});

function createGrid(pixelDimension) {
  noOfpixels = Math.round(pixelContainer.clientHeight / pixelDimension);
  pixelBoxes = "";
  pixelContainer.setAttribute("data-dimension", pixelDimension);

  // Create Pixels Grid
  pixelContainer.style.gridTemplate = `repeat(${noOfpixels}, 1fr) / repeat(${noOfpixels}, 1fr)`;
  for (let i = 0; i < Math.pow(noOfpixels, 2); i++) {
    pixelBoxes += "<div></div>";
  }
  pixelContainer.innerHTML = pixelBoxes;

  // Event Listener to Grid Pixels
  [...pixelContainer.children].forEach((child) => addListener(child));
  function addListener(child) {
    child.addEventListener("mouseenter", () => {
      colorChange(child);
    });
    // child.addEventListener('mouseleave', () => console.log('mouseout'));
  }
}
// ========
// Pixels - end
// ========
// ========
// Colors - start
// ========
let currentColor = document.querySelector(".current-color");
let colorValue = "rgb";
let colorButtos = [...document.querySelectorAll(".color-button")];
colorButtos.forEach((button) =>
  button.addEventListener("click", (e) => {
    colorValue = e.target.dataset.color;
    pixelContainer.innerHTML = "";
    createGrid(pixelDimension);
  })
);

function getRandomValue() {
  return Math.floor(Math.random() * 256);
}

function getBlackVariant() {
  let val = getRandomValue();
  if (val >= 220 || val <= 45) {
    val = 111;
  }
  console.log(val);
  currentColor.textContent = `rgb(${val}, ${val}, ${val})`;
  // currentColor.style.color = color;
  return `rgb(${val}, ${val}, ${val})`;
}

function colorChange(child) {
  switch (colorValue) {
    case "rgb":
      color = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
      currentColor.textContent = color;
      // currentColor.style.color = color;
      break;
    case "gray":
      color = getBlackVariant();
  }
  child.style.background = color;
  pixelContainer.classList.add("custom-border");
  document.documentElement.style.setProperty("--border", color);
}

let utilButtons = [...document.querySelectorAll(".util-buttons")];
utilButtons.forEach((button) => button.addEventListener("click", toggleGrid));

function toggleGrid() {
  pixelContainer.classList.toggle("grid-on");
}
