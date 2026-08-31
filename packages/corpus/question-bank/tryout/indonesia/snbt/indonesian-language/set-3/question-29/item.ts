import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *simbol* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *simbol* mengenali perangkat penceritaan yang menghubungkan benda berulang, tindakan tokoh, dan respons yang belum tuntas pada penutup.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *simbol* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *simbol* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menerangkan latar sehingga tindakan tokoh dan perubahan makna benda tidak relevan.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
