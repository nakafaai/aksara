import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "speeding up at $$2.7\\text{ m s}^{-2}$$; $$5.2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "slowing down at $$2.7\\text{ m s}^{-2}$$; $$5.2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "slowing down at $$2.7\\text{ m s}^{-2}$$; $$5.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "speeding up at $$2.6\\text{ m s}^{-2}$$; $$5.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memecut pada $$2.7\\text{ m s}^{-2}$$; $$5.2\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "memperlahan pada $$2.7\\text{ m s}^{-2}$$; $$5.2\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "memperlahan pada $$2.7\\text{ m s}^{-2}$$; $$5.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "memecut pada $$2.6\\text{ m s}^{-2}$$; $$5.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
