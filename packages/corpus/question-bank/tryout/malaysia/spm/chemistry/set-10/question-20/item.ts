import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$255\\text{ g}$$, $$1.20\\text{ kg}$$, $$90.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.40\\text{ kg}$$, $$16.0\\text{ kg}$$, $$1.20\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$510\\text{ g}$$, $$2.40\\text{ kg}$$, $$180\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$510\\text{ g}$$, $$2.40\\text{ kg}$$, $$240\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$255\\text{ g}$$, $$1.20\\text{ kg}$$, $$90.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.40\\text{ kg}$$, $$16.0\\text{ kg}$$, $$1.20\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$510\\text{ g}$$, $$2.40\\text{ kg}$$, $$180\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$510\\text{ g}$$, $$2.40\\text{ kg}$$, $$240\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
