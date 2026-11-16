import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P: Plantae. Q: Protista. R: Fungi. S: Plantae.",
        },
        {
          correct: false,
          label: "P: Monera. Q: Protista. R: Protista. S: Plantae.",
        },
        {
          correct: false,
          label: "P: Monera. Q: Plantae. R: Fungi. S: Plantae.",
        },
        {
          correct: true,
          label: "P: Monera. Q: Protista. R: Fungi. S: Plantae.",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P: Plantae. Q: Protista. R: Fungi. S: Plantae.",
        },
        {
          correct: false,
          label: "P: Monera. Q: Protista. R: Protista. S: Plantae.",
        },
        {
          correct: false,
          label: "P: Monera. Q: Plantae. R: Fungi. S: Plantae.",
        },
        {
          correct: true,
          label: "P: Monera. Q: Protista. R: Fungi. S: Plantae.",
        },
      ],
    },
  },
};

export default item;
