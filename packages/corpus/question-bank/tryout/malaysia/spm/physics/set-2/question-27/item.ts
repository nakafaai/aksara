import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.4\\text{ N}$$; $$625$$ strokes",
        },
        {
          correct: false,
          label: "$$6.1\\text{ N}$$; $$625$$ strokes",
        },
        {
          correct: false,
          label: "$$6.7\\text{ N}$$; $$125$$ strokes",
        },
        {
          correct: true,
          label: "$$6.7\\text{ N}$$; $$625$$ strokes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.4\\text{ N}$$; $$625$$ lejang",
        },
        {
          correct: false,
          label: "$$6.1\\text{ N}$$; $$625$$ lejang",
        },
        {
          correct: false,
          label: "$$6.7\\text{ N}$$; $$125$$ lejang",
        },
        {
          correct: true,
          label: "$$6.7\\text{ N}$$; $$625$$ lejang",
        },
      ],
    },
  },
};

export default item;
