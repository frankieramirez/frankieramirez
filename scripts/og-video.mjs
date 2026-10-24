// Renders the El Morro share video: two gulls circling above the sentry box in
// the og.jpg engraving. Run with `node scripts/og-video.mjs` (needs ffmpeg).
//
// Every motion is a function of 2π·t/LOOP with integer multipliers, so the
// frame after the last one is the first one again and the loop has no seam.
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const SOURCE = `${root}public/og.jpg`;
const OUT_DIR = `${root}public/og`;
const VIDEO = `${OUT_DIR}/el-morro.mp4`;
const POSTER = `${OUT_DIR}/el-morro.jpg`;

const WIDTH = 1200;
const HEIGHT = 630;
const FPS = 30;
const LOOP = 8;
const FRAMES = FPS * LOOP;
const POSTER_FRAME = 75;
// Matches --color-ink in src/styles/tokens/primitives.css.
const INK = "#232321";
const TAU = Math.PI * 2;

// Both birds circle in the open sky over the sea, clear of the headline.
// Orbits are flattened ellipses, so a bird shrinks and pales as it moves away.
const gulls = [
  { cx: 990, cy: 250, rx: 160, ry: 44, span: 52, ink: 0.92, phase: 0, flapAt: 0.6 },
  { cx: 1060, cy: 140, rx: 110, ry: 28, span: 36, ink: 0.72, phase: 2.4, flapAt: 3.9 },
];

// A distant gull, drawn the way engravers drew them: two tapered strokes
// bowed into a shallow "m". `lift` runs from -1 (downstroke) to 1 (upstroke).
function gullPath(span, lift) {
  const half = span / 2;
  const wristX = half * 0.42;
  const wristY = -span * (0.07 + 0.11 * lift);
  const tipX = half;
  const tipY = span * (0.04 - 0.26 * lift);
  const root = span * 0.045;
  const wrist = span * 0.04;
  const wing = (s) =>
    [
      `M 0 ${-root}`,
      `Q ${s * wristX * 0.45} ${wristY * 0.7 - wrist} ${s * wristX} ${wristY - wrist}`,
      `Q ${s * (wristX + tipX) * 0.52} ${wristY - wrist * 0.6} ${s * tipX} ${tipY}`,
      `Q ${s * (wristX + tipX) * 0.5} ${wristY + wrist * 0.4} ${s * wristX} ${wristY + wrist}`,
      `Q ${s * wristX * 0.45} ${wristY * 0.7 + wrist} 0 ${root * 1.4}`,
      "Z",
    ].join(" ");
  return `${wing(1)} ${wing(-1)}`;
}

function gullAt(gull, t) {
  const angle = TAU * (t / LOOP) + gull.phase;
  // depth: 1 at the near side of the orbit, -1 at the far side
  const depth = Math.sin(angle);
  const x = gull.cx + gull.rx * Math.cos(angle);
  const y = gull.cy + gull.ry * depth + 6 * Math.sin(2 * angle);
  const scale = 0.82 + 0.18 * depth;
  // bank into the turn, hardest at the ends of the ellipse
  const bank = 14 * Math.cos(angle);
  // a short bout of flapping once per orbit, gliding the rest of the way
  const bout = Math.max(0, Math.cos(angle - gull.flapAt)) ** 6;
  const flap = Math.sin(TAU * 18 * (t / LOOP) + gull.phase);
  const lift = 0.15 + 0.06 * Math.sin(2 * angle) + bout * 0.95 * flap;
  const opacity = gull.ink * (0.8 + 0.2 * depth);
  return `<path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${bank.toFixed(2)}) scale(${scale.toFixed(3)})"
    d="${gullPath(gull.span, lift)}" fill="${INK}" fill-opacity="${opacity.toFixed(3)}" filter="url(#ink)" />`;
}

// A faint turbulence wobble keeps the strokes from looking vector-clean.
function frameSvg(t) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <filter id="ink" x="-20%" y="-50%" width="140%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
      <feDisplacementMap in="SourceGraphic" scale="1.1" />
    </filter>
  </defs>
  ${gulls.map((gull) => gullAt(gull, t)).join("\n")}
</svg>`);
}

const base = await sharp(SOURCE).removeAlpha().raw().toBuffer();
const render = (frame) =>
  sharp(base, { raw: { width: WIDTH, height: HEIGHT, channels: 3 } })
    .composite([{ input: frameSvg(frame / FPS) }]);

await mkdir(OUT_DIR, { recursive: true });

const ffmpeg = spawn(
  "ffmpeg",
  [
    "-v", "error", "-y",
    "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", `${WIDTH}x${HEIGHT}`, "-r", String(FPS),
    "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-tune", "animation",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
    VIDEO,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);
const done = new Promise((resolve, reject) => {
  ffmpeg.on("error", reject);
  ffmpeg.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))));
});

for (let frame = 0; frame < FRAMES; frame++) {
  const pixels = await render(frame).removeAlpha().raw().toBuffer();
  if (!ffmpeg.stdin.write(pixels)) await new Promise((resolve) => ffmpeg.stdin.once("drain", resolve));
}
ffmpeg.stdin.end();
await done;

await render(POSTER_FRAME).jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(POSTER);
console.log(`Wrote ${VIDEO} and ${POSTER}`);
