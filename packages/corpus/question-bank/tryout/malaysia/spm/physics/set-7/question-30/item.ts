import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$6.9\\text{ h}$$ and $$87\\%$$",
        },
        {
          correct: true,
          label: "$$170\\text{ W}$$, $$8.7\\text{ h}$$ and $$69\\%$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$1.6\\text{ h}$$ and $$100\\%$$",
        },
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$5.6\\text{ h}$$ and $$100\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$6.9\\text{ j}$$ dan $$87\\%$$",
        },
        {
          correct: true,
          label: "$$170\\text{ W}$$, $$8.7\\text{ j}$$ dan $$69\\%$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$1.6\\text{ j}$$ dan $$100\\%$$",
        },
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$5.6\\text{ j}$$ dan $$100\\%$$",
        },
      ],
    },
  },
};

export default item;
