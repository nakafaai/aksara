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
          label: "$$3.0\\text{ N}$$; $$1.40\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ N}$$; $$1.50\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ N}$$; $$1.70\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ N}$$; $$1.70\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ N}$$; $$1.40\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ N}$$; $$1.50\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ N}$$; $$1.70\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ N}$$; $$1.70\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
