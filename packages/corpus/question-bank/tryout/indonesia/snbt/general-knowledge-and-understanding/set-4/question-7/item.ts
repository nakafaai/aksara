import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "hanya memuat kelompok yang jumlahnya paling besar",
        },
        {
          isCorrect: false,
          label:
            "membagi jumlah responden sama rata tanpa melihat komposisi populasi",
        },
        {
          isCorrect: true,
          label: "cukup mencerminkan ragam kelompok yang hendak dijelaskan",
        },
        {
          isCorrect: false,
          label:
            "mengutamakan kelompok yang paling mudah dijangkau pengumpul data",
        },
        {
          isCorrect: false,
          label:
            "memiliki responden banyak meskipun ragam kelompok penting tidak tercakup",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
