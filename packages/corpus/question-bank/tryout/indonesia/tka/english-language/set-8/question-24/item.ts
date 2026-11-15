import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "reading-minutes",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Students should read more.",
        },
        {
          correct: false,
          label: "The reading time raised test scores by $$8$$ points.",
        },
        {
          correct: true,
          label:
            "The two pilot classes together borrowed $$180$$ more books than in the semester before.",
        },
        {
          correct: false,
          label: "The $$15$$ minutes should come from the first lesson.",
        },
        {
          correct: false,
          label: "The reading time was tried in every class.",
        },
      ],
    },
  },
};

export default item;
