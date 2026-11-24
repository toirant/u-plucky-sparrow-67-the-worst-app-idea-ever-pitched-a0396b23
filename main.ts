// The Worst App Idea Ever Pitched — make.fun entry
// Writes one sentence (218 characters) pitching the worst, most useless
// app imaginable to /output/entry.txt.
//
// The pitch: FridgeCam Live livestreams the inside of your fridge to
// strangers, who vote on whether your leftovers are still food. It is a
// product with a name, a function nobody needs, and a founder who means
// every word of it.
//
// The gate requires 1–240 characters of UTF-8 text, not only whitespace,
// on a single line, so the entry is validated before it is written and
// read back afterwards to confirm the file holds exactly what was intended.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "FridgeCam Live is an app that livestreams the inside of your fridge to strangers, who vote on whether your leftovers are still food, with a premium tier that lets them smell it and a leaderboard for the moldiest shelf.";

const MAX_CHARS = 240;

// Validate the entry before writing: one line, 1–240 characters,
// not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`Entry is ${ENTRY.length} characters; must be 1–${MAX_CHARS}.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back round-trip check: the file must hold exactly the entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the entry.");
}
console.log(`Wrote and verified ${ENTRY.length} characters in /output/entry.txt`);
