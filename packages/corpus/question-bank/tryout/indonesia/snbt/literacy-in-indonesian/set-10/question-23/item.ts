import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "lingua-franca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa bahasa Melayu punya penutur asli terbanyak, sehingga teka-teki itu sebenarnya tidak ada",
        },
        {
          correct: true,
          label:
            "menyiapkan dasar penjelasan pertama, yaitu bahwa bahasa Melayu sudah lama dipakai dan dikenal melintasi suku dan pulau jauh sebelum 1928",
        },
        {
          correct: false,
          label:
            "menyiapkan penjelasan kedua, yaitu bahwa bahasa Jawa memiliki tingkat tutur seperti ngoko dan krama",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa bahasa Indonesia sekarang sama dengan bahasa pada prasasti dan bahasa di pelabuhan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Kerajaan Sriwijaya mewajibkan bahasa Melayu bagi semua suku di Nusantara",
        },
      ],
    },
  },
};

export default item;
