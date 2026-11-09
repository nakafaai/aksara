import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "essay-scoring",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membuktikan bahwa semua skor yang diberikan mesin kepada siswa itu keliru.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa rata-rata yang tinggi dapat menutupi kesalahan pada esai tak biasa.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa siswa di kelas penulis malas menulis esai yang panjang.",
        },
        {
          correct: false,
          label:
            "Menegaskan bahwa kosakata yang canggih tidak penting dalam menulis esai.",
        },
        {
          correct: false,
          label:
            "Menyindir dinas pendidikan karena menggelar uji coba di dua belas sekolah.",
        },
      ],
    },
  },
};

export default item;
