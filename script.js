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
  slider.setAttribute("data-dimension", pixelDimension);

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
    // child.addEventListener("touchmove", () => {
    //   colorChange(child);
    // });
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
let colorButtons = [...document.querySelectorAll(".color-button")];
colorButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    colorButtons.forEach((button) => {
      if (button.classList.contains("active")) {
        button.classList.remove("active");
      }
    });
    e.target.classList.add("active");
    currentColor.textContent = e.target.textContent;
    colorValue = e.target.dataset.color;
    pixelContainer.innerHTML = "";
    document.documentElement.style.setProperty("--border", "green");
    createGrid(pixelDimension);
  })
);

function getRandomValue() {
  return Math.floor(Math.random() * 256);
}

function getBlackVariant() {
  let val = getRandomValue();
  if (val <= 50) {
    val += 110;
  } else if (val >= 200) {
    val -= 80;
  }
  // console.log(val);
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
// ========
// Colors - end
// ========
// ========
// Utils - start
// ========
let utilButtons = [...document.querySelectorAll(".util-buttons")];
utilButtons.forEach((button) =>
  button.addEventListener("click", (e) => toggleUtil(e.target))
);

function toggleUtil(button) {
  switch (button.dataset.util) {
    case "toggle-grid":
      pixelContainer.classList.toggle("grid-on");
      break;
    case "clear":
      pixelContainer.innerHTML = "";
      createGrid(pixelDimension);
      break;
  }
}

pixelContainer.addEventListener(
  "touchstart",
  () => (currentColor.textContent = "touchstart")
);
pixelContainer.addEventListener(
  "touchend",
  () => (currentColor.textContent = "touchend")
);
pixelContainer.addEventListener("touchmove", function (e) {
  e.preventDefault();
  colorChange(e.target);
  // currentColor.textContent = e.target;
  // colorChange(e.target);al
  // e.target.style.background = "black";
});
