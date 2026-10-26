import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "repair-clinic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "setiap benda sebaiknya dibongkar agar sumber kerusakan dapat dipastikan",
        },
        {
          correct: false,
          label:
            "rujukan sekolah menentukan meja pemeriksaan tanpa memerlukan inspeksi awal",
        },
        {
          correct: true,
          label: "pemeriksaan awal menentukan apakah benda aman ditangani",
        },
        {
          correct: false,
          label:
            "baterai menggembung tetap dapat diuji di meja awal selama tidak dibongkar",
        },
        {
          correct: false,
          label:
            "gejala dari pemilik cukup dicatat setelah pengujian benda selesai",
        },
      ],
    },
  },
};

export default item;
