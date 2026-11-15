import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pendekatan Wolbachia dapat melindungi warga walaupun jumlah nyamuk Aedes aegypti di wilayahnya tidak berkurang.",
        },
        {
          column: 2,
          label:
            "Karena proporsi pasien positif di klaster pelepasan kira-kira seperempat proporsi di klaster pembanding, pelepasan mencegah sekitar tiga perempat dari seluruh demam yang dialami warga.",
        },
        {
          column: 1,
          label:
            "Seandainya tidak ada nyamuk yang menyeberang batas klaster, efikasi yang terukur kemungkinan tidak lebih rendah daripada $$77{,}1\\%$$.",
        },
        {
          column: 2,
          label:
            "Uji AWED menunjukkan bahwa pelepasan nyamuk ber-Wolbachia lebih efektif daripada pengasapan dan pemberantasan sarang.",
        },
        {
          column: 1,
          label:
            "Dugaan bahwa penurunan kasus hanya terjadi karena warga klaster pelepasan lebih jarang berobat dijawab oleh cara peneliti membandingkan proporsi.",
        },
      ],
    },
  },
};

export default item;
