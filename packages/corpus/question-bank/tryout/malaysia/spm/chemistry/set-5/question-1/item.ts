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
          label: "$$7.0\\%$$, copper only",
        },
        {
          correct: true,
          label: "$$7.0\\%$$, nickel or copper",
        },
        {
          correct: false,
          label: "$$3.7\\%$$, nickel or copper",
        },
        {
          correct: false,
          label: "$$7.0\\%$$, iron, nickel, copper or silver",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.0\\%$$, kuprum sahaja",
        },
        {
          correct: true,
          label: "$$7.0\\%$$, nikel atau kuprum",
        },
        {
          correct: false,
          label: "$$3.7\\%$$, nikel atau kuprum",
        },
        {
          correct: false,
          label: "$$7.0\\%$$, besi, nikel, kuprum atau argentum",
        },
      ],
    },
  },
};

export default item;
