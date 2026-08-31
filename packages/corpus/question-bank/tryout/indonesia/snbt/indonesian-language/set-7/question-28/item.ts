import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Benda berulang memperoleh makna terutama dari bentuk fisiknya, bukan dari hubungannya dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Akhir cerita menunjukkan bahwa latar, bukan tindakan tokoh, menyelesaikan konflik.",
        },
        {
          isCorrect: false,
          label:
            "Makna benda tetap sama meskipun tokoh menggunakannya dengan cara berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan akhir penting karena mengukuhkan penafsiran yang sudah terbentuk sejak awal.",
        },
        {
          isCorrect: true,
          label:
            "kartu pertanyaan memperoleh makna karena muncul bersama konflik, pilihan, dan perubahan pada akhir cerita.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
