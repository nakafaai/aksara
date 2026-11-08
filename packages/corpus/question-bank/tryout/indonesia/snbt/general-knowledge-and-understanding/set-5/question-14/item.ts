import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "mikroplastik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sebab dan akibat, karena larangan itu dibuat setelah dampaknya terbukti",
        },
        {
          correct: true,
          label:
            "pertentangan, karena larangan dibuat walaupun dampaknya belum dipastikan",
        },
        {
          correct: false,
          label:
            "urutan waktu, karena larangan dibuat sebelum penelitian dimulai",
        },
        {
          correct: false,
          label:
            "penjelasan, karena larangan itu merinci hasil penelitian para ahli",
        },
        {
          correct: false,
          label:
            "perbandingan, karena larangan itu dianggap lebih penting daripada penelitian",
        },
      ],
    },
  },
};

export default item;
