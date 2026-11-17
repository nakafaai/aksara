import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$67\\text{ kPa}$$, then $$70\\text{ kPa}$$",
        },
        { correct: true, label: "$$67\\text{ kPa}$$, then $$64\\text{ kPa}$$" },
        {
          correct: false,
          label: "$$40\\text{ kPa}$$, then $$37\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$167\\text{ kPa}$$, then $$164\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$67\\text{ kPa}$$, kemudian $$70\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$67\\text{ kPa}$$, kemudian $$64\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ kPa}$$, kemudian $$37\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$167\\text{ kPa}$$, kemudian $$164\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
