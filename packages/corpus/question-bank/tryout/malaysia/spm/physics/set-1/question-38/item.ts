import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.5\\text{ hours}$$",
        },
        {
          correct: true,
          label: "$$6.0\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$24\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ hours}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.5\\text{ jam}$$",
        },
        {
          correct: true,
          label: "$$6.0\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$24\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
