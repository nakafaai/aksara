import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$151\\text{ mmHg}$$, and $$4.0\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$89\\text{ mmHg}$$, and $$0.018\\text{ N}$$",
        },
        { correct: true, label: "$$89\\text{ mmHg}$$, and $$2.4\\text{ N}$$" },
        {
          correct: false,
          label: "$$120\\text{ mmHg}$$, and $$3.2\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$151\\text{ mmHg}$$, dan $$4.0\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$89\\text{ mmHg}$$, dan $$0.018\\text{ N}$$",
        },
        { correct: true, label: "$$89\\text{ mmHg}$$, dan $$2.4\\text{ N}$$" },
        {
          correct: false,
          label: "$$120\\text{ mmHg}$$, dan $$3.2\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
