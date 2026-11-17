import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$45\\text{ N}$$, $$36\\%$$ and $$0.33\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ N}$$, $$36\\%$$ and $$0.51\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ N}$$, $$20\\%$$ and $$0.64\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$46\\text{ N}$$, $$36\\%$$ and $$0.33\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$45\\text{ N}$$, $$36\\%$$ dan $$0.33\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ N}$$, $$36\\%$$ dan $$0.51\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ N}$$, $$20\\%$$ dan $$0.64\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$46\\text{ N}$$, $$36\\%$$ dan $$0.33\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
