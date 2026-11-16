import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Adding $$900\\text{ cm}^3$$ of water gives pH $$3.0$$, and adding the alkali instead gives pH $$2.48$$",
        },
        {
          correct: false,
          label:
            "Adding $$1000\\text{ cm}^3$$ of water gives pH $$3.0$$, and adding the alkali instead gives pH $$2.30$$",
        },
        {
          correct: false,
          label:
            "Adding $$100\\text{ cm}^3$$ of water gives pH $$3.0$$, and adding the alkali instead gives pH $$2.48$$",
        },
        {
          correct: false,
          label:
            "Adding $$900\\text{ cm}^3$$ of water gives pH $$3.0$$, and adding the alkali instead gives pH $$7.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menambah $$900\\text{ cm}^3$$ air memberi pH $$3.0$$, dan menambah alkali itu sebaliknya memberi pH $$2.48$$",
        },
        {
          correct: false,
          label:
            "Menambah $$1000\\text{ cm}^3$$ air memberi pH $$3.0$$, dan menambah alkali itu sebaliknya memberi pH $$2.30$$",
        },
        {
          correct: false,
          label:
            "Menambah $$100\\text{ cm}^3$$ air memberi pH $$3.0$$, dan menambah alkali itu sebaliknya memberi pH $$2.48$$",
        },
        {
          correct: false,
          label:
            "Menambah $$900\\text{ cm}^3$$ air memberi pH $$3.0$$, dan menambah alkali itu sebaliknya memberi pH $$7.0$$",
        },
      ],
    },
  },
};

export default item;
