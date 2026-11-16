import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Gases: none. R: solid. S: solid" },
        { correct: false, label: "Gases: P and S. R: liquid. S: solid" },
        { correct: false, label: "Gases: P, Q and S. R: liquid. S: liquid" },
        { correct: true, label: "Gases: P and S. R: liquid. S: liquid" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Gas: tiada. R: pepejal. S: pepejal" },
        { correct: false, label: "Gas: P dan S. R: cecair. S: pepejal" },
        { correct: false, label: "Gas: P, Q dan S. R: cecair. S: cecair" },
        { correct: true, label: "Gas: P dan S. R: cecair. S: cecair" },
      ],
    },
  },
};

export default item;
