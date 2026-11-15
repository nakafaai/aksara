import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A NOR gate",
        },
        {
          correct: false,
          label: "An AND gate",
        },
        {
          correct: true,
          label: "An OR gate",
        },
        {
          correct: false,
          label: "A NAND gate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Get TAKATAU (NOR)",
        },
        {
          correct: false,
          label: "Get DAN (AND)",
        },
        {
          correct: true,
          label: "Get ATAU (OR)",
        },
        {
          correct: false,
          label: "Get TAKDAN (NAND)",
        },
      ],
    },
  },
};

export default item;
