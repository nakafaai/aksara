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
          correct: false,
          label: "$$680\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$720\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$640\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$680\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$720\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$640\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
