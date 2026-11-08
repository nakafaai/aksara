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
          label: "Membuktikan bahwa semua skor yang diberikan mesin keliru.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa kecocokan rata-rata yang tinggi dapat menyembunyikan kesalahan besar pada esai yang tidak biasa.",
        },
        {
          correct: false,
          label: "Menunjukkan bahwa siswa di kelas penulis malas menulis esai.",
        },
        {
          correct: false,
          label:
            "Menegaskan bahwa kosakata yang canggih tidak penting dalam menulis.",
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
