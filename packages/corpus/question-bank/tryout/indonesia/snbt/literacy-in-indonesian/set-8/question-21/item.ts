import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "nickel-processing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai ekspor produk olahan nikel naik setiap tahun sejak 2020.",
        },
        {
          correct: false,
          label:
            "Jumlah pekerja di kawasan industri pengolahan terus bertambah.",
        },
        {
          correct: true,
          label:
            "Penyakit saluran napas warga sekitar smelter naik sejak smelter beroperasi.",
        },
        {
          correct: false,
          label:
            "Harga nikel dunia naik ketika permintaan baterai kendaraan listrik meningkat tajam.",
        },
        {
          correct: false,
          label:
            "Sebagian smelter mungkin akan memakai listrik tenaga surya kelak.",
        },
      ],
    },
  },
};

export default item;
