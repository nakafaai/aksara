import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.840\\text{ g}$$, $$0\\text{ g}$$, $$0.950\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.420\\text{ g}$$, $$0.580\\text{ g}$$, $$1.43\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.420\\text{ g}$$, $$0.290\\text{ g}$$, $$0.475\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.420\\text{ g}$$, $$0.290\\text{ g}$$, $$0.950\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.840\\text{ g}$$, $$0\\text{ g}$$, $$0.950\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.420\\text{ g}$$, $$0.580\\text{ g}$$, $$1.43\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.420\\text{ g}$$, $$0.290\\text{ g}$$, $$0.475\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.420\\text{ g}$$, $$0.290\\text{ g}$$, $$0.950\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
