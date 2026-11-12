// Renders scripts/og-card/card.html to the 1200x630 share card used for link previews (Telegram, X, etc).
// Needs Google Chrome installed. Usage: node scripts/og-card/render.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, "../../public/og/share-card.jpg");
const chrome = process.env.CHROME_BIN || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const png = path.join(os.tmpdir(), `og-card-${Date.now()}.png`);

execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
  "--force-device-scale-factor=1", "--window-size=1200,630", "--virtual-time-budget=3000",
  `--screenshot=${png}`, pathToFileURL(path.join(here, "card.html")).href,
], { stdio: "ignore" });

await sharp(png).resize(1200, 630).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toFile(OUT);
fs.rmSync(png);
console.log(`wrote ${path.relative(process.cwd(), OUT)}`);
