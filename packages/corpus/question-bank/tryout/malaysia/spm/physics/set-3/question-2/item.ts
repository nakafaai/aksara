import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9.87\\text{ m s}^{-2}$$; $$2.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$39.5\\text{ m s}^{-2}$$; $$4.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$9.87\\text{ m s}^{-2}$$; $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$9.87\\text{ m s}^{-2}$$; $$8.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9.87\\text{ m s}^{-2}$$; $$2.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$39.5\\text{ m s}^{-2}$$; $$4.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$9.87\\text{ m s}^{-2}$$; $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$9.87\\text{ m s}^{-2}$$; $$8.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
