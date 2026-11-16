import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ m s}^{-1}$$; $$0\\%$$",
        },
        {
          correct: false,
          label: "$$400\\text{ m s}^{-1}$$; $$1\\%$$",
        },
        {
          correct: false,
          label: "$$396\\text{ m s}^{-1}$$; $$99\\%$$",
        },
        {
          correct: true,
          label: "$$400\\text{ m s}^{-1}$$; $$99\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ m s}^{-1}$$; $$0\\%$$",
        },
        {
          correct: false,
          label: "$$400\\text{ m s}^{-1}$$; $$1\\%$$",
        },
        {
          correct: false,
          label: "$$396\\text{ m s}^{-1}$$; $$99\\%$$",
        },
        {
          correct: true,
          label: "$$400\\text{ m s}^{-1}$$; $$99\\%$$",
        },
      ],
    },
  },
};

export default item;
