import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$ strokes, $$10.8\\text{ cm}$$ and $$5$$ strokes",
        },
        {
          correct: false,
          label: "$$15$$ strokes, $$19.2\\text{ cm}$$ and $$5$$ strokes",
        },
        {
          correct: true,
          label: "$$15$$ strokes, $$10.8\\text{ cm}$$ and $$5$$ strokes",
        },
        {
          correct: false,
          label: "$$15$$ strokes, $$10.8\\text{ cm}$$ and $$4$$ strokes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$ lejang, $$10.8\\text{ cm}$$ dan $$5$$ lejang",
        },
        {
          correct: false,
          label: "$$15$$ lejang, $$19.2\\text{ cm}$$ dan $$5$$ lejang",
        },
        {
          correct: true,
          label: "$$15$$ lejang, $$10.8\\text{ cm}$$ dan $$5$$ lejang",
        },
        {
          correct: false,
          label: "$$15$$ lejang, $$10.8\\text{ cm}$$ dan $$4$$ lejang",
        },
      ],
    },
  },
};

export default item;
