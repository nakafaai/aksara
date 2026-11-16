import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$70\\text{ cmHg}$$; $$17.1\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$70\\text{ cmHg}$$; $$17.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$76\\text{ cmHg}$$; $$17.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ cmHg}$$; $$15.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$70\\text{ cmHg}$$; $$17.1\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$70\\text{ cmHg}$$; $$17.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$76\\text{ cmHg}$$; $$17.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ cmHg}$$; $$15.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
