import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menurunkan tekanan darah",
        },
        {
          isCorrect: false,
          label: "mencegah penyakit kardiovaskular",
        },
        {
          isCorrect: true,
          label: "meningkatkan tekanan darah",
        },
        {
          isCorrect: false,
          label: "mempercepat pencernaan",
        },
        {
          isCorrect: false,
          label: "menghilangkan kebutuhan tubuh akan kalium",
        },
      ],
    },
  },
};

export default item;
