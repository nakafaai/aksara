import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "longitude-clock",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$7.5$$ minutes, which is about $$55$$ km at the equator",
        },
        {
          correct: false,
          label:
            "About $$30$$ seconds, which is about $$55$$ km at the equator",
        },
        {
          correct: true,
          label: "About $$2$$ minutes, which is about $$55$$ km at the equator",
        },
        {
          correct: false,
          label:
            "About $$2$$ minutes, which is about $$111$$ km at the equator",
        },
        {
          correct: false,
          label:
            "About $$4$$ minutes, which is about $$111$$ km at the equator",
        },
      ],
    },
  },
};

export default item;
