const fs = require("fs");
const PNG = require("pngjs").PNG;
const ImageTracer = require("imagetracerjs");

// Configuration
const INPUT_PATH = "apps/web/public/logo.png";
const OUTPUT_PATH = "apps/web/public/logo-traced.svg";

// Tracing options - Tuned for a clean logo trace
const options = {
  ltres: 0.1, // Linear error threshold (lower = more detailed)
  qtres: 0.1, // Quadratic error threshold (lower = more detailed)
  pathomit: 8, // Ignore small paths < 8px
  colorsampling: 2, // Deterministic sampling
  numberofcolors: 4, // Reduce colors to smooth out the gradient
  mincolorratio: 0,
  colorquantcycles: 3,
  scale: 1,
  simplify: 0,
  roundcoords: 1,
  lcpr: 0,
  qcpr: 0,
  desc: false,
  viewbox: true,
  blurradius: 0, // No blur to keep sharp edges
  blurdelta: 20,
};

console.log(`Reading ${INPUT_PATH}...`);

try {
  const data = fs.readFileSync(INPUT_PATH);
  const png = PNG.sync.read(data);

  console.log(`Image loaded: ${png.width}x${png.height}`);
  console.log("Tracing...");

  // Convert raw PNG data to the format ImageTracer expects
  // ImageTracer expects an object with {width, height, data} where data is a Uint8ClampedArray (RGBA)
  const imageData = {
    width: png.width,
    height: png.height,
    data: png.data,
  };

  const svgString = ImageTracer.imagedataToSVG(imageData, options);

  fs.writeFileSync(OUTPUT_PATH, svgString);
  console.log(`✅ SVG saved to ${OUTPUT_PATH}`);
  console.log("You can now open this file to view the calculated Bezier curves.");
} catch (err) {
  if (err.code === "ENOENT") {
    console.error(`Error: Could not find file ${INPUT_PATH}`);
  } else if (err.code === "MODULE_NOT_FOUND") {
    console.error("Error: Missing dependencies.");
    console.error("Please run: pnpm add -D pngjs imagetracerjs");
  } else {
    console.error("An error occurred:", err);
  }
}
