import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "cellular-respiration",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.1\\text{ L}$$, to remove the lactic acid made during the run",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ L}$$, to remove the lactic acid made during the run",
        },
        {
          correct: false,
          label:
            "$$4.3\\text{ L}$$, to replace the oxygen breathed out as carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$4.3\\text{ L}$$, to remove the lactic acid made during the run",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.1\\text{ L}$$, untuk menyingkirkan asid laktik yang terhasil semasa larian",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ L}$$, untuk menyingkirkan asid laktik yang terhasil semasa larian",
        },
        {
          correct: false,
          label:
            "$$4.3\\text{ L}$$, untuk menggantikan oksigen yang dihembus keluar sebagai karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$4.3\\text{ L}$$, untuk menyingkirkan asid laktik yang terhasil semasa larian",
        },
      ],
    },
  },
};

export default item;
