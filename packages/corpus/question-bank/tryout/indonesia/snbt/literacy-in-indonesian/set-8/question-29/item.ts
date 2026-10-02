import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *perkembangan tokoh* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *perkembangan tokoh* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *perkembangan tokoh* memberi dasar untuk membandingkan tindakan Jati pada awal dan akhir, tanpa mensyaratkan bahwa ia harus memahami seluruh bacaan.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *perkembangan tokoh* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
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
