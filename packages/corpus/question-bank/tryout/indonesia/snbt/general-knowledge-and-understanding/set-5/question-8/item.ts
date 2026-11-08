import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "petir",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Berteduh di bawah satu-satunya pohon tinggi di tengah sawah ketika hujan petir turun.",
        },
        {
          column: 1,
          label:
            "Berlindung di dalam mobil beratap logam ketika guruh mulai terdengar.",
        },
        {
          column: 2,
          label:
            "Melanjutkan pertandingan sepak bola lima menit setelah guruh terakhir terdengar.",
        },
        {
          column: 1,
          label:
            "Menghentikan latihan di lapangan terbuka begitu guruh terdengar walaupun hujan belum turun.",
        },
      ],
    },
  },
};

export default item;
