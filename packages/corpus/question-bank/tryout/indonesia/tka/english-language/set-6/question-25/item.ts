import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "information-validity",
  },
  stimulus: "walking-bus",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "SD Lereng Asri's vehicle numbers came from a national survey.",
        },
        { column: 1, label: "A walking bus is led by volunteer parents." },
        {
          column: 2,
          label: "Walking buses are impossible during the rainy season.",
        },
        {
          column: 1,
          label:
            "A fifteen-minute walk each way adds up to thirty minutes of activity.",
        },
      ],
    },
  },
};

export default item;
