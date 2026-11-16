import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.0653\\text{ g}$$, because all the oxygen has been used up",
        },
        {
          correct: false,
          label:
            "$$0.0490\\text{ g}$$, because all the oxygen has been used up",
        },
        {
          correct: false,
          label:
            "$$0.0980\\text{ g}$$, because all the oxygen has been used up",
        },
        {
          correct: false,
          label: "$$0.0653\\text{ g}$$, because the steel wool has all rusted",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.0653\\text{ g}$$, kerana semua oksigen telah digunakan",
        },
        {
          correct: false,
          label: "$$0.0490\\text{ g}$$, kerana semua oksigen telah digunakan",
        },
        {
          correct: false,
          label: "$$0.0980\\text{ g}$$, kerana semua oksigen telah digunakan",
        },
        {
          correct: false,
          label: "$$0.0653\\text{ g}$$, kerana semua wul keluli telah berkarat",
        },
      ],
    },
  },
};

export default item;
