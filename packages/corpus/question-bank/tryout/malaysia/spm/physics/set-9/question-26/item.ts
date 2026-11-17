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
          label: "$$70.0\\text{ cm}$$, and $$4.0\\text{ cmHg}$$",
        },
        {
          correct: false,
          label: "$$70.6\\text{ cm}$$, and $$4.0\\text{ cmHg}$$",
        },
        {
          correct: false,
          label: "$$70.1\\text{ cm}$$, and $$3.9\\text{ cmHg}$$",
        },
        {
          correct: true,
          label: "$$70.6\\text{ cm}$$, and $$3.4\\text{ cmHg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$70.0\\text{ cm}$$, dan $$4.0\\text{ cmHg}$$",
        },
        {
          correct: false,
          label: "$$70.6\\text{ cm}$$, dan $$4.0\\text{ cmHg}$$",
        },
        {
          correct: false,
          label: "$$70.1\\text{ cm}$$, dan $$3.9\\text{ cmHg}$$",
        },
        {
          correct: true,
          label: "$$70.6\\text{ cm}$$, dan $$3.4\\text{ cmHg}$$",
        },
      ],
    },
  },
};

export default item;
