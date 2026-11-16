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
          label: "$$34.6\\text{ N}$$ and $$54.7^\\circ$$",
        },
        {
          correct: true,
          label: "$$34.6\\text{ N}$$ and $$35.3^\\circ$$",
        },
        {
          correct: false,
          label: "$$34.6\\text{ N}$$ and $$30.0^\\circ$$",
        },
        {
          correct: false,
          label: "$$60.0\\text{ N}$$ and $$35.3^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$34.6\\text{ N}$$ dan $$54.7^\\circ$$",
        },
        {
          correct: true,
          label: "$$34.6\\text{ N}$$ dan $$35.3^\\circ$$",
        },
        {
          correct: false,
          label: "$$34.6\\text{ N}$$ dan $$30.0^\\circ$$",
        },
        {
          correct: false,
          label: "$$60.0\\text{ N}$$ dan $$35.3^\\circ$$",
        },
      ],
    },
  },
};

export default item;
