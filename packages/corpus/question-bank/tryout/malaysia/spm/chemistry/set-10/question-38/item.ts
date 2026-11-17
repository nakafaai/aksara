import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.100\\text{ mol}$$, $$10.0\\%$$, $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$20.0\\%$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$5.00\\%$$, $$0.96\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.0500\\text{ mol}$$, $$20.0\\%$$, $$0\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.100\\text{ mol}$$, $$10.0\\%$$, $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$20.0\\%$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$5.00\\%$$, $$0.96\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.0500\\text{ mol}$$, $$20.0\\%$$, $$0\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
