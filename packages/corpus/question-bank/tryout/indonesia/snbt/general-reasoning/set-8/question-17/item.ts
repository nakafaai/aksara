import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tahun ke-$$2$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$3$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$4$$",
        },
        {
          isCorrect: true,
          label: "Tahun ke-$$1$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$5$$",
        },
      ],
    },
  },
};

export default item;
