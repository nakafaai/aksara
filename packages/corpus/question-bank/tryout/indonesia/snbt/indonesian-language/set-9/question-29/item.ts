import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *motif* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *motif* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *motif* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *motif* mengenali perangkat penceritaan yang menghubungkan benda berulang, tindakan tokoh, dan respons yang belum tuntas pada penutup.",
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
