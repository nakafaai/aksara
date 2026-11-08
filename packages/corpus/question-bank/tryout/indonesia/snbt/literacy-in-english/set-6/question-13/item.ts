import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "water-meters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It shows that the smart meters in Area A were installed incorrectly by the company.",
        },
        {
          correct: false,
          label:
            "It means that Area A should have been compared with Area B only.",
        },
        {
          correct: true,
          label:
            "Part of Area A's fall may come from repaired leaks rather than the meters.",
        },
        {
          correct: false,
          label:
            "It proves that the smart meters had no effect on water use at all.",
        },
        {
          correct: false,
          label:
            "It suggests that leaks might be more common in Areas C and D.",
        },
      ],
    },
  },
};

export default item;
