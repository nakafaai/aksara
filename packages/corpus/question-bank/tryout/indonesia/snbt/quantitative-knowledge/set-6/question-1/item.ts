import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pernyataan (1) saja cukup untuk menjawab pertanyaan tetapi pernyataan (2) saja tidak cukup.",
        },
        {
          isCorrect: true,
          label:
            "Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (2) saja cukup untuk menjawab pertanyaan tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (1) saja cukup untuk menjawab pertanyaan dan pernyataan (2) saja cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan.",
        },
      ],
    },
  },
};

export default item;
