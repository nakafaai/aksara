import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, $$10\\text{ s}$$ and $$2.0\\text{ cm s}^{-1}$$ towards the lens",
        },
        {
          correct: true,
          label:
            "$$30\\text{ cm}$$, $$10\\text{ s}$$ and $$2.0\\text{ cm s}^{-1}$$ away from the lens",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, $$5.0\\text{ s}$$ and $$2.0\\text{ cm s}^{-1}$$ away from the lens",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, $$15\\text{ s}$$ and $$4.0\\text{ cm s}^{-1}$$ towards the lens",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, $$10\\text{ s}$$ dan $$2.0\\text{ cm s}^{-1}$$ menghampiri kanta",
        },
        {
          correct: true,
          label:
            "$$30\\text{ cm}$$, $$10\\text{ s}$$ dan $$2.0\\text{ cm s}^{-1}$$ menjauhi kanta",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$, $$5.0\\text{ s}$$ dan $$2.0\\text{ cm s}^{-1}$$ menjauhi kanta",
        },
        {
          correct: false,
          label:
            "$$15\\text{ cm}$$, $$15\\text{ s}$$ dan $$4.0\\text{ cm s}^{-1}$$ menghampiri kanta",
        },
      ],
    },
  },
};

export default item;
