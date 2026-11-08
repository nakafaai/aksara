import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "regional-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Teks 1 mengusulkan satu kewajiban yang tegas, sedangkan Teks 2 meminta pelajaran disesuaikan dengan bahasa ibu murid.",
        },
        {
          correct: false,
          label:
            "Teks 1 ingin menyelamatkan bahasa daerah, sedangkan Teks 2 menganggap bahasa daerah tidak perlu diselamatkan.",
        },
        {
          correct: false,
          label:
            "Teks 1 menolak bahasa Indonesia di sekolah, sedangkan Teks 2 mendukung bahasa Indonesia sebagai satu-satunya bahasa.",
        },
        {
          correct: false,
          label:
            "Teks 1 membahas sekolah di kota, sedangkan Teks 2 membahas sekolah di desa.",
        },
        {
          correct: false,
          label:
            "Teks 1 menyalahkan sekolah, sedangkan Teks 2 menyalahkan orang tua murid.",
        },
      ],
    },
  },
};

export default item;
