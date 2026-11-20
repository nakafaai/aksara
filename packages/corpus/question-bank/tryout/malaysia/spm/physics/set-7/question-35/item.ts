import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.4\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ and $$2.0\\text{ V}$$ per division",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m s}^{-1}$$, $$3.0\\text{ V}$$ and $$1.0\\text{ V}$$ per division",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ and $$1.0\\text{ V}$$ per division",
        },
        {
          correct: true,
          label:
            "$$13\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ and $$2.0\\text{ V}$$ per division",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.4\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ dan $$2.0\\text{ V}$$ setiap bahagian",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m s}^{-1}$$, $$3.0\\text{ V}$$ dan $$1.0\\text{ V}$$ setiap bahagian",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ dan $$1.0\\text{ V}$$ setiap bahagian",
        },
        {
          correct: true,
          label:
            "$$13\\text{ m s}^{-1}$$, $$6.0\\text{ V}$$ dan $$2.0\\text{ V}$$ setiap bahagian",
        },
      ],
    },
  },
};

export default item;
