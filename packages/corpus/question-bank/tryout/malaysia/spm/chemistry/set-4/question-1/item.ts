import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A titre of 23.55 cm³ with an uncertainty of ±0.05 cm³, which is 0.21%",
        },
        {
          correct: true,
          label:
            "A titre of 23.55 cm³ with an uncertainty of ±0.10 cm³, which is 0.42%",
        },
        {
          correct: false,
          label:
            "A titre of 26.05 cm³ with an uncertainty of ±0.10 cm³, which is 0.38%",
        },
        {
          correct: false,
          label:
            "A titre of 23.55 cm³ with an uncertainty of ±0.10 cm³, which is 4.2%",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Titer 23.55 cm³ dengan ketakpastian ±0.05 cm³, iaitu 0.21%",
        },
        {
          correct: true,
          label: "Titer 23.55 cm³ dengan ketakpastian ±0.10 cm³, iaitu 0.42%",
        },
        {
          correct: false,
          label: "Titer 26.05 cm³ dengan ketakpastian ±0.10 cm³, iaitu 0.38%",
        },
        {
          correct: false,
          label: "Titer 23.55 cm³ dengan ketakpastian ±0.10 cm³, iaitu 4.2%",
        },
      ],
    },
  },
};

export default item;
