import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ and $$60\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$38\\text{ N}$$, $$23\\text{ N}$$ and $$60\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ and $$34\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ and $$45\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ dan $$60\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$38\\text{ N}$$, $$23\\text{ N}$$ dan $$60\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ dan $$34\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ N}$$, $$40\\text{ N}$$ dan $$45\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
