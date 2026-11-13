import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "el-nino-drought",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Adanya tahun El Nino dengan kemarau yang biasa saja melemahkan pernyataan bahwa El Nino menaikkan peluang kemarau kering.",
        },
        {
          column: 2,
          label:
            "Pada tahun El Nino, wilayah dekat khatulistiwa di Sumatra bagian utara cenderung kehilangan hujan lebih banyak daripada Nusa Tenggara.",
        },
        {
          column: 1,
          label:
            "Bila El Nino dan IOD positif berlangsung bersamaan, kekeringan paling mungkin bertambah parah pada paruh kedua tahun, bukan pada puncak musim hujan.",
        },
        {
          column: 2,
          label:
            "Teks menunjukkan bahwa IOD positif lebih sering menjadi penyebab kemarau parah di Indonesia daripada El Nino.",
        },
      ],
    },
  },
};

export default item;
