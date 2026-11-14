import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "gelasan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua layang-layang yang diterbangkan di zona utara lebarnya lebih dari dua meter.",
        },
        {
          correct: false,
          label: "Layang-layang naga wajib diterbangkan di zona utara.",
        },
        {
          correct: false,
          label:
            "Layang-layang yang lebarnya tidak lebih dari dua meter hanya boleh diterbangkan pada sore hari.",
        },
        {
          correct: false,
          label:
            "Lomba layang-layang naga digelar pada pagi hari karena zona utara hanya dibuka pada pagi hari.",
        },
        {
          correct: true,
          label:
            "Tahun ini, layang-layang yang lebarnya lebih dari dua meter hanya dapat diterbangkan di festival itu pada pagi hari.",
        },
      ],
    },
  },
};

export default item;
