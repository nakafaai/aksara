import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40\\text{ A}$$, $$10$$ lamps and $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$40$$ lamps and $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$10$$ lamps and $$1.9\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$10$$ lamps and $$6.0\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40\\text{ A}$$, $$10$$ lampu dan $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$40$$ lampu dan $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$10$$ lampu dan $$1.9\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ A}$$, $$10$$ lampu dan $$6.0\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
