import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/input-sequence');
const OUTPUT_DIR = path.join(__dirname, '../public/sequence');
const TARGET_FRAMES = 90;

// Ensure directories exist
if (!fs.existsSync(INPUT_DIR)) {
  fs.mkdirSync(INPUT_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function convertSequence() {
  console.log(`Scanning input directory: ${INPUT_DIR}`);
  
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    // Sort naturally so 1.jpg comes before 10.jpg
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) {
    console.log(`No images found in ${INPUT_DIR}`);
    console.log(`Please place your source images in the /public/input-sequence directory and run this script again.`);
    return;
  }

  console.log(`Found ${files.length} images. Converting and mapping to ${TARGET_FRAMES} frames...`);

  // We map the available input files evenly across the 90 target frames.
  // E.g. if you only have 4 files, they will be placed at frame 1, 30, 60, 90.
  // The canvas frontend will automatically crossfade between them!
  
  for (let i = 0; i < TARGET_FRAMES; i++) {
    // Map the 0-89 frame index to the available input files
    const progress = i / (TARGET_FRAMES - 1); // 0.0 to 1.0
    let sourceIndex = Math.floor(progress * (files.length - 1));
    
    // Nearest neighbor or just exact mapping
    // We'll just duplicate the nearest frame so the frontend has all 90 files.
    // Wait, the frontend alpha blending works best if we just provide the actual frames and it interpolates.
    // By duplicating frames, the frontend will crossfade.
    const sourceFile = files[sourceIndex];
    const inputPath = path.join(INPUT_DIR, sourceFile);
    
    // Format output frame name: frame_0001.webp
    const frameNumber = (i + 1).toString().padStart(4, '0');
    const outputPath = path.join(OUTPUT_DIR, `frame_${frameNumber}.webp`);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 4 }) // Optimized webp compression
        .toFile(outputPath);
      
      if (i % 10 === 0) console.log(`Generated ${outputPath}`);
    } catch (err) {
      console.error(`Error converting ${sourceFile}:`, err);
    }
  }

  console.log(`\nSuccess! Generated ${TARGET_FRAMES} .webp frames in ${OUTPUT_DIR}`);
  console.log(`The frontend will now automatically load and smoothly crossfade between these frames.`);
}

convertSequence();
