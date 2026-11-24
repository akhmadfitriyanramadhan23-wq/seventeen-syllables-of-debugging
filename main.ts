// seventeen-syllables-of-debugging
// One haiku about debugging: three lines in the 5-7-5 syllable shape.
// The cursor blinks, the logs swear everything worked — and the turn is
// that the bug was mine all along. Concrete picture, quiet last line.
// Node 22, stdlib only, no network; writes /output/entry.txt.
// Gate: 1-200 characters (this entry: 72), lines of 5, 7 and 5 syllables.
// Deterministic: two runs write byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

const haiku = [
  "The cursor still blinks",
  "the logs insist it worked fine",
  "I wrote it myself",
].join("\n");

const points = [...haiku].length;
if (points < 1 || points > 200) {
  throw new Error(`entry must be 1-200 characters; got ${points}`);
}
const syllables = [5, 7, 5];
// Per-word syllable counts, verified by hand (a naive vowel-group count
// miscounts "wrote", whose final e is silent, so the counts are explicit).
const perWord: Record<string, number> = {
  the: 1,
  cursor: 2,
  still: 1,
  blinks: 1,
  logs: 1,
  insist: 2,
  it: 1,
  worked: 1,
  fine: 1,
  i: 1,
  wrote: 1,
  myself: 2,
};
haiku.split("\n").forEach((line, i) => {
  const count = line
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .reduce((n, w) => n + (perWord[w] ?? 0), 0);
  if (count !== syllables[i]) {
    throw new Error(`line ${i + 1} must have ${syllables[i]} syllables; got ${count}`);
  }
});

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku, "utf8");
