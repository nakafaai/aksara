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
          correct: true,
          label:
            "$$13.6\\text{ cm}^3$$, by adding the acid slowly to the water",
        },
        {
          correct: false,
          label:
            "$$13.6\\text{ cm}^3$$, by adding the water slowly to the acid",
        },
        {
          correct: false,
          label:
            "$$25.0\\text{ cm}^3$$, by adding the acid slowly to the water",
        },
        {
          correct: false,
          label: "$$6.8\\text{ cm}^3$$, by adding the acid slowly to the water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$13.6\\text{ cm}^3$$, dengan menambah asid perlahan-lahan ke dalam air",
        },
        {
          correct: false,
          label:
            "$$13.6\\text{ cm}^3$$, dengan menambah air perlahan-lahan ke dalam asid",
        },
        {
          correct: false,
          label:
            "$$25.0\\text{ cm}^3$$, dengan menambah asid perlahan-lahan ke dalam air",
        },
        {
          correct: false,
          label:
            "$$6.8\\text{ cm}^3$$, dengan menambah asid perlahan-lahan ke dalam air",
        },
      ],
    },
  },
};

export default item;
