import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keep equipment in service whenever any repair remains technically possible.",
        },
        {
          correct: false,
          label: "Safety guards may be removed to reduce cost.",
        },
        {
          correct: false,
          label:
            "Assess repair cost without comparing the safety of available replacements.",
        },
        {
          correct: true,
          label:
            "Repeated failures across identical items provide evidence for choosing a better design.",
        },
        {
          correct: false,
          label:
            "Treat avoiding a new purchase as sufficient evidence of a lower environmental cost.",
        },
      ],
    },
  },
  stimulus: "repair-first",
};

export default item;
