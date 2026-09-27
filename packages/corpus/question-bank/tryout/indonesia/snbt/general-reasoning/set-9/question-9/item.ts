import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Memperkuat Pernyataan B",
        },
        {
          isCorrect: false,
          label: "Memperkuat Pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah Pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah Pernyataan B",
        },
        {
          isCorrect: false,
          label: "Tidak relevan dengan kedua pernyataan",
        },
      ],
    },
  },
};

export default item;
