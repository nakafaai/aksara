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
          label: "$$170\\text{ W}$$, $$87\\%$$ and $$7.4\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$170\\text{ W}$$, $$69\\%$$ and $$3.8\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$100\\%$$ and $$10\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$69\\%$$ and the whole $$12\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$87\\%$$ dan $$7.4\\text{ j}$$",
        },
        {
          correct: true,
          label: "$$170\\text{ W}$$, $$69\\%$$ dan $$3.8\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$100\\%$$ dan $$10\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ W}$$, $$69\\%$$ dan sepanjang $$12\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
