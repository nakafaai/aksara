import { Array as Arr } from "effect";

import { hash } from "#contracts/test/assessment/item";
import {
  passageVersion,
  snbtQuestion10,
  snbtQuestion11,
  snbtQuestion12,
} from "#contracts/test/assessment/passage";
import { allOrNothing, perPart } from "#contracts/test/assessment/scoring";
import { tkaMatrix, tkaMultiple } from "#contracts/test/assessment/tka";

/** Builds one section of the SNBT profile: key, items, seconds, and its three names. */
function snbtSection(
  id: string,
  items: number,
  seconds: number,
  names: { readonly de: string; readonly en: string; readonly id: string }
) {
  return {
    id,
    interactions: ["choice"],
    items,
    names,
    navigation: "free",
    seconds,
    tools: [],
  };
}

/** The seven subtests of UTBK-SNBT, with the counts and times of the corpus source. */
const SNBT_SECTIONS = [
  snbtSection("general-reasoning", 30, 1800, {
    de: "Allgemeines Schlussfolgern",
    en: "General Reasoning",
    id: "Penalaran Umum",
  }),
  snbtSection("general-knowledge-and-understanding", 20, 900, {
    de: "Allgemeines Wissen und Verständnis",
    en: "General Knowledge and Understanding",
    id: "Pengetahuan dan Pemahaman Umum",
  }),
  snbtSection("reading-comprehension-and-writing", 20, 1500, {
    de: "Leseverständnis und Schreiben",
    en: "Reading Comprehension and Writing",
    id: "Pemahaman Bacaan dan Menulis",
  }),
  snbtSection("quantitative-knowledge", 20, 1200, {
    de: "Quantitatives Wissen",
    en: "Quantitative Knowledge",
    id: "Pengetahuan Kuantitatif",
  }),
  snbtSection("literacy-in-indonesian", 30, 2550, {
    de: "Lesekompetenz in indonesischer Sprache",
    en: "Literacy in Indonesian",
    id: "Literasi dalam Bahasa Indonesia",
  }),
  snbtSection("literacy-in-english", 20, 1200, {
    de: "Lesekompetenz in englischer Sprache",
    en: "Literacy in English",
    id: "Literasi dalam Bahasa Inggris",
  }),
  snbtSection("mathematical-reasoning", 20, 2550, {
    de: "Mathematisches Schlussfolgern",
    en: "Mathematical Reasoning",
    id: "Penalaran Matematika",
  }),
];

/** The accommodations of the three tiers, as a test-only catalog. */
export const accommodations = {
  assigned: ["text-to-speech", "high-contrast", "separate-room"],
  recorded: [
    { kind: "extraTime", maxPercent: 50 },
    { kind: "extraBreak", maxSeconds: 600 },
    { kind: "reader" },
    { kind: "scribe" },
    { kind: "alternateFormat" },
  ],
  universal: ["zoom", "highlighter", "line-reader"],
};

/**
 * The profile of UTBK-SNBT: seven subtests, 160 items, 195 minutes, no break,
 * and an IRT score. The scale is a test-only range, because no official scale
 * is verified.
 */
export const snbtProfile = {
  accommodations,
  breaks: [],
  defaults: [{ interaction: "choice", rule: allOrNothing }],
  id: "indonesia/snbt",
  names: { de: "SNBT", en: "SNBT", id: "SNBT" },
  report: { sections: true, standardError: true, total: true },
  scale: { maximum: 1000, minimum: 0 },
  scoring: { kind: "irt" },
  sections: SNBT_SECTIONS,
  totalSeconds: 11_700,
};

/** The first section of the school exam: a calculator, a formula sheet, and mark for review. */
export const partOne = {
  id: "part-one",
  interactions: ["choice", "textEntry"],
  items: 10,
  names: { de: "Teil eins", en: "Part one", id: "Bagian satu" },
  navigation: "linear",
  seconds: 1800,
  tools: ["calculator-scientific", "formula-sheet", "mark-for-review"],
};

/** The second section of the school exam: free navigation, and notes. */
export const partTwo = {
  id: "part-two",
  interactions: ["choice", "extendedText"],
  items: 5,
  names: { de: "Teil zwei", en: "Part two", id: "Bagian dua" },
  navigation: "free",
  seconds: 1200,
  tools: ["notes"],
};

/** The default rule of a choice in the school exam. */
export const choiceDefault = { interaction: "choice", rule: perPart };

/** The default rule of a text entry in the school exam. */
export const textEntryDefault = {
  interaction: "textEntry",
  rule: allOrNothing,
};

/**
 * A test-only school exam: a raw score, two sections that allow several
 * interactions and enable tools, and a break between the sections.
 */
export const schoolProfile = {
  accommodations: { assigned: [], recorded: [], universal: ["zoom"] },
  breaks: [{ after: "part-one", seconds: 300 }],
  defaults: [choiceDefault, textEntryDefault],
  id: "school/test-exam",
  names: { de: "Testpruefung", en: "Test exam", id: "Ujian uji" },
  report: { sections: false, standardError: false, total: true },
  scoring: { kind: "raw" },
  sections: [partOne, partTwo],
  totalSeconds: 3000,
};

/** The profile that the paper of the passage set follows, by identifier and hash. */
export const profileReference = { hash: hash("7"), id: snbtProfile.id };

/** Names one item version by its family and its hash. */
function placementOf(version: {
  readonly family: string;
  readonly hash: string;
}) {
  return { family: version.family, hash: version.hash };
}

/** The section of the three questions that share the passage. */
export const passageSection = {
  placements: Arr.map(
    [snbtQuestion10, snbtQuestion11, snbtQuestion12],
    placementOf
  ),
  section: "general-knowledge-and-understanding",
};

/** The section of the two TKA questions, placed here to test a second section. */
export const tkaSection = {
  placements: Arr.map([tkaMultiple, tkaMatrix], placementOf),
  section: "quantitative-knowledge",
};

/** The first place of the passage section. */
export const firstPlacement = placementOf(snbtQuestion10);

/** The one stimulus version that the paper uses. */
export const passageReference = {
  hash: passageVersion.hash,
  id: passageVersion.id,
};

/** The passage set of SNBT general knowledge set 10 as a frozen paper: two sections. */
export const snbtPaper = {
  id: "indonesia/snbt/2027/set-10",
  profile: profileReference,
  sections: [passageSection, tkaSection],
  stimuli: [passageReference],
};

/**
 * The two TKA questions alone as a test-only paper, with the same profile
 * reference: no item shares a reading, so it lists no stimulus version.
 */
export const tkaPaper = {
  id: "indonesia/tka/2027/set-1",
  profile: profileReference,
  sections: [tkaSection],
  stimuli: [],
};
