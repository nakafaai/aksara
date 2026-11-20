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
          label: "$$173\\text{ W}$$, $$4.6\\text{ h}$$ and $$10\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$138\\text{ W}$$, $$4.3\\text{ h}$$ and $$10\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$138\\text{ W}$$, $$5.8\\text{ h}$$ and $$10\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$138\\text{ W}$$, $$5.8\\text{ h}$$ and $$10.4\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$173\\text{ W}$$, $$4.6\\text{ j}$$ dan $$10\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$138\\text{ W}$$, $$4.3\\text{ j}$$ dan $$10\\text{ j}$$",
        },
        {
          correct: true,
          label: "$$138\\text{ W}$$, $$5.8\\text{ j}$$ dan $$10\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$138\\text{ W}$$, $$5.8\\text{ j}$$ dan $$10.4\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
