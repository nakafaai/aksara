import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$151\\text{ V}$$; $$82$$",
        },
        {
          correct: false,
          label: "$$151\\text{ V}$$; $$1$$",
        },
        {
          correct: false,
          label: "$$12.4\\text{ kV}$$; $$1$$",
        },
        {
          correct: false,
          label: "$$302\\text{ V}$$; $$41$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$151\\text{ V}$$; $$82$$",
        },
        {
          correct: false,
          label: "$$151\\text{ V}$$; $$1$$",
        },
        {
          correct: false,
          label: "$$12.4\\text{ kV}$$; $$1$$",
        },
        {
          correct: false,
          label: "$$302\\text{ V}$$; $$41$$",
        },
      ],
    },
  },
};

export default item;
