import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "street-vendors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sekitar Rp$$150{.}000$$, sehingga sewa sebulan sama dengan pendapatan satu hari",
        },
        {
          correct: false,
          label:
            "sekitar Rp$$290{.}000$$, sehingga sewa sebulan tertutup oleh pendapatan kurang dari satu hari",
        },
        {
          correct: false,
          label:
            "sekitar Rp$$208{.}000$$, sehingga sewa sebulan baru tertutup oleh pendapatan sekitar tiga hari",
        },
        {
          correct: false,
          label:
            "sekitar Rp$$250{.}000$$, sama dengan pedagang Pasar Baru, sehingga sewa sebulan tertutup oleh pendapatan kurang dari satu hari",
        },
        {
          correct: true,
          label:
            "sekitar Rp$$208{.}000$$, sehingga sewa sebulan tertutup oleh pendapatan kurang dari satu hari",
        },
      ],
    },
  },
};

export default item;
