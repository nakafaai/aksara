import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$84.4\\%$$, $$11.0\\text{ cm}^3$$, it dissolves in the alkali without giving off gas",
        },
        {
          correct: false,
          label:
            "$$15.6\\%$$, $$11.0\\text{ cm}^3$$, it also gives off hydrogen",
        },
        {
          correct: false,
          label:
            "$$15.6\\%$$, $$10.0\\text{ cm}^3$$, it does not react with the alkali",
        },
        {
          correct: true,
          label:
            "$$15.6\\%$$, $$11.0\\text{ cm}^3$$, it dissolves in the alkali without giving off gas",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$84.4\\%$$, $$11.0\\text{ cm}^3$$, ia larut dalam alkali tanpa membebaskan gas",
        },
        {
          correct: false,
          label:
            "$$15.6\\%$$, $$11.0\\text{ cm}^3$$, ia juga membebaskan hidrogen",
        },
        {
          correct: false,
          label:
            "$$15.6\\%$$, $$10.0\\text{ cm}^3$$, ia tidak bertindak balas dengan alkali",
        },
        {
          correct: true,
          label:
            "$$15.6\\%$$, $$11.0\\text{ cm}^3$$, ia larut dalam alkali tanpa membebaskan gas",
        },
      ],
    },
  },
};

export default item;
