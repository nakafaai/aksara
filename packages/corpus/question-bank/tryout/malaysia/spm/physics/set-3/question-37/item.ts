import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$ alpha, $$6$$ beta; $$32$$ fewer",
        },
        {
          correct: false,
          label: "$$8$$ alpha, $$10$$ beta; $$22$$ fewer",
        },
        {
          correct: true,
          label: "$$8$$ alpha, $$6$$ beta; $$22$$ fewer",
        },
        {
          correct: false,
          label: "$$6$$ alpha, $$8$$ beta; $$22$$ fewer",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$ alfa, $$6$$ beta; $$32$$ kurang",
        },
        {
          correct: false,
          label: "$$8$$ alfa, $$10$$ beta; $$22$$ kurang",
        },
        {
          correct: true,
          label: "$$8$$ alfa, $$6$$ beta; $$22$$ kurang",
        },
        {
          correct: false,
          label: "$$6$$ alfa, $$8$$ beta; $$22$$ kurang",
        },
      ],
    },
  },
};

export default item;
