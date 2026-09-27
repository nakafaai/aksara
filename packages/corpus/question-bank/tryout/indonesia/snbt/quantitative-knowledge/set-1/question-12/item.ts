import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup",
        },
        {
          isCorrect: true,
          label:
            "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup",
        },
        {
          isCorrect: false,
          label:
            "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup untuk menjawab pertanyaan",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan",
        },
      ],
    },
  },
};

export default item;
