import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Definisi *atmosfer* mengarahkan pembaca menghubungkan bunyi aula, gerak pengunjung, dan percakapan di meja untuk menafsirkan perubahan suasana.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *atmosfer* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *atmosfer* dengan tingkat kebisingan, sehingga suasana tidak mungkin berubah selama bunyi aula tetap ada.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *atmosfer* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut membuat pertanyaan pada kartu menjadi jawaban ilmiah yang menyelesaikan perdebatan kedua anak.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
