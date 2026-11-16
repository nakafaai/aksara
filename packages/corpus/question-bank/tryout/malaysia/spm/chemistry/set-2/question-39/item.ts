import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.06\\text{ g}$$, and the detergent forms no scum because its calcium salt dissolves in water",
        },
        {
          correct: false,
          label:
            "$$6.12\\text{ g}$$, and the detergent loses the same mass as scum",
        },
        {
          correct: true,
          label:
            "$$6.12\\text{ g}$$, and the detergent forms no scum because its calcium salt dissolves in water",
        },
        {
          correct: false,
          label:
            "$$6.06\\text{ g}$$, and the detergent forms no scum because its calcium salt dissolves in water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.06\\text{ g}$$, dan detergen tidak membentuk kekat kerana garam kalsiumnya larut dalam air",
        },
        {
          correct: false,
          label:
            "$$6.12\\text{ g}$$, dan detergen kehilangan jisim yang sama sebagai kekat",
        },
        {
          correct: true,
          label:
            "$$6.12\\text{ g}$$, dan detergen tidak membentuk kekat kerana garam kalsiumnya larut dalam air",
        },
        {
          correct: false,
          label:
            "$$6.06\\text{ g}$$, dan detergen tidak membentuk kekat kerana garam kalsiumnya larut dalam air",
        },
      ],
    },
  },
};

export default item;
