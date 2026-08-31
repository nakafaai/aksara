import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Paragraph $$4$$",
        },
        {
          isCorrect: false,
          label: "Paragraph $$1$$",
        },
        {
          isCorrect: false,
          label: "Paragraph $$2$$",
        },
        {
          isCorrect: false,
          label: "Paragraph $$3$$",
        },
        {
          isCorrect: false,
          label: "Paragraph $$5$$",
        },
      ],
    },
  },
};

export default item;
