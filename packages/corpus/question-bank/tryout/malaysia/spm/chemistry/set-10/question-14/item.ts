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
          label: "$$80.0\\%$$, $$120\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$80.0\\%$$, $$120\\text{ cm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$20.0\\%$$, $$30.0\\text{ cm}^3$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$100\\%$$, $$150\\text{ cm}^3$$, $$125\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80.0\\%$$, $$120\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$80.0\\%$$, $$120\\text{ cm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$20.0\\%$$, $$30.0\\text{ cm}^3$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$100\\%$$, $$150\\text{ cm}^3$$, $$125\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
