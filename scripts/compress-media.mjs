// Compresses gallery media inside design-references/.
//
// Images: preview.* files and everything under dribbble/ and pinterest/ become
//   <name>.webp (max 1920px wide) + <name>.thumb.webp (640px, for the grid).
//   The original is deleted and references in nearby .md files are renamed.
//   Images imported by component code (e.g. circular-split-roll/images/) are left alone.
// Videos: every .mp4 is re-encoded to H.264, max 1280px wide, no audio, faststart.
//   Kept only if smaller. Processed videos are tracked in .compressed.json so
//   re-runs never re-encode (and degrade) the same file twice.
//
// Usage: node scripts/compress-media.mjs [--dry]
// Needs ffmpeg on PATH (or FFMPEG=<path to ffmpeg.exe>).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../design-references");
const MANIFEST = path.join(ROOT, ".compressed.json");
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const DRY = process.argv.includes("--dry");

const FULL_WIDTH = 1920;
const THUMB_WIDTH = 640;
const WEBP_QUALITY = 80;
const VIDEO_MAX_WIDTH = 1280;
const VIDEO_CRF = 28;

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const STATIC_GALLERIES = ["dribbble", "pinterest"];

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const rel = (p) => path.relative(ROOT, p).replaceAll("\\", "/");
const kb = (n) => `${Math.round(n / 1024)}KB`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function isGalleryImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext) || file.endsWith(".thumb.webp")) return false;
  const top = rel(file).split("/")[0];
  return path.basename(file).startsWith("preview.") || STATIC_GALLERIES.includes(top);
}

// Rename references (e.g. `preview.png` -> `preview.webp`) in .md files of the
// file's folder and its parents, up to design-references/.
function renameMdReferences(file, oldName, newName) {
  for (let dir = path.dirname(file); dir.startsWith(ROOT); dir = path.dirname(dir)) {
    for (const md of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const mdPath = path.join(dir, md);
      const text = fs.readFileSync(mdPath, "utf8");
      if (text.includes(oldName)) fs.writeFileSync(mdPath, text.replaceAll(oldName, newName));
    }
    if (dir === ROOT) break;
  }
}

async function compressImage(file) {
  const ext = path.extname(file);
  const base = file.slice(0, -ext.length);
  const full = `${base}.webp`;
  const thumb = `${base}.thumb.webp`;
  const before = fs.statSync(file).size;
  if (DRY) return console.log(`[dry] image ${rel(file)} (${kb(before)})`);

  const input = fs.readFileSync(file); // read into memory so the source can be overwritten when ext is .webp
  const animated = ext.toLowerCase() === ".gif";
  await sharp(input, { animated })
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(`${full}.tmp`);
  await sharp(input).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 75 }).toFile(thumb);

  const after = fs.statSync(`${full}.tmp`).size;
  if (ext.toLowerCase() === ".webp" && after >= before) {
    fs.rmSync(`${full}.tmp`); // already-optimal webp: keep it, only the thumb was new
  } else {
    fs.renameSync(`${full}.tmp`, full);
    if (full !== file) fs.rmSync(file);
    renameMdReferences(file, path.basename(file), path.basename(full));
  }
  console.log(`image ${rel(file)} ${kb(before)} -> ${kb(fs.statSync(full).size)} (+thumb ${kb(fs.statSync(thumb).size)})`);
}

function compressVideo(file) {
  const before = fs.statSync(file).size;
  if (manifest[rel(file)] === before) return;
  if (DRY) return console.log(`[dry] video ${rel(file)} (${kb(before)})`);

  const tmp = `${file}.tmp.mp4`;
  execFileSync(FFMPEG, [
    "-y", "-loglevel", "error", "-i", file,
    "-vf", `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
    "-c:v", "libx264", "-crf", String(VIDEO_CRF), "-preset", "slow", "-pix_fmt", "yuv420p",
    "-an", "-movflags", "+faststart", tmp,
  ]);
  const after = fs.statSync(tmp).size;
  if (after < before) fs.renameSync(tmp, file);
  else fs.rmSync(tmp);
  manifest[rel(file)] = fs.statSync(file).size;
  console.log(`video ${rel(file)} ${kb(before)} -> ${kb(fs.statSync(file).size)}${after >= before ? " (kept original)" : ""}`);
}

const files = walk(ROOT);
const images = files.filter((f) => isGalleryImage(f) && !fs.existsSync(f.replace(/\.[^.]+$/, ".thumb.webp")));
const videos = files.filter((f) => f.endsWith(".mp4") && !f.endsWith(".tmp.mp4"));

for (const f of images) await compressImage(f);
for (const f of videos) compressVideo(f);
if (!DRY) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
