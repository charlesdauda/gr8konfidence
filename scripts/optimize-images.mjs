// Run once (and again whenever you add images):  node scripts/optimize-images.mjs
// Needs:  npm i -D sharp
//
// For every PNG/JPG in src/assets/images it writes:
//   name.webp          full size for the lightbox   (max 1600px wide)
//   covers/name.webp   medium version for the category cards (max 900px wide)
//   thumbs/name.webp   tiny version for the lightbox strip (max 240px wide)
// about.png also gets about.webp (max 1200px wide).
// The original files are never touched or deleted.
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("src/assets/images");
const THUMBS = path.join(DIR, "thumbs");
const COVERS = path.join(DIR, "covers");
await mkdir(THUMBS, { recursive: true });
await mkdir(COVERS, { recursive: true });

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";
let before = 0;
let after = 0;

for (const file of await readdir(DIR)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const name = path.parse(file).name;
  if (name === "logo") continue; // navbar logo stays as it is
  const src = path.join(DIR, file);
  const isAbout = name === "about";

  const full = path.join(DIR, `${name}.webp`);
  await sharp(src)
    .rotate()
    .resize({ width: isAbout ? 1200 : 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(full);

  let thumbSize = 0;
  if (!isAbout) {
    const thumb = path.join(THUMBS, `${name}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: 240, withoutEnlargement: true })
      .webp({ quality: 70, effort: 5 })
      .toFile(thumb);
    const cover = path.join(COVERS, `${name}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(cover);
    thumbSize = (await stat(thumb)).size + (await stat(cover)).size;
  }

  const o = (await stat(src)).size;
  const f = (await stat(full)).size;
  before += o;
  after += f + thumbSize;
  console.log(`${file.padEnd(16)} ${mb(o).padStart(9)} -> ${mb(f).padStart(8)} (+ thumb/cover ${mb(thumbSize)})`);
}
console.log(`\nTotal original ${mb(before)}  ->  optimised ${mb(after)}`);