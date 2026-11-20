import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.4\\text{ min}$$, $$27\\text{ min}$$ and $$54\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$4.4\\text{ min}$$, $$21\\text{ min}$$ and $$42\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$13\\text{ min}$$, $$27\\text{ min}$$ and $$54\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$4.4\\text{ min}$$, $$32\\text{ min}$$ and $$64\\text{ min}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.4\\text{ min}$$, $$27\\text{ min}$$ dan $$54\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$4.4\\text{ min}$$, $$21\\text{ min}$$ dan $$42\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$13\\text{ min}$$, $$27\\text{ min}$$ dan $$54\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$4.4\\text{ min}$$, $$32\\text{ min}$$ dan $$64\\text{ min}$$",
        },
      ],
    },
  },
};

export default item;
