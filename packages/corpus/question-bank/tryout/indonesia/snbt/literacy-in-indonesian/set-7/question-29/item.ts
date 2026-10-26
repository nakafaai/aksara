import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Definisi *atmosfer* mengarahkan pembaca menghubungkan bunyi aula, gerak pengunjung, dan percakapan di meja untuk menafsirkan perubahan suasana.",
        },
        {
          correct: false,
          label:
            "Istilah *atmosfer* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *atmosfer* dengan tingkat kebisingan, sehingga suasana tidak mungkin berubah selama bunyi aula tetap ada.",
        },
        {
          correct: false,
          label:
            "Penyebutan *atmosfer* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut membuat pertanyaan pada kartu menjadi jawaban ilmiah yang menyelesaikan perdebatan kedua anak.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
