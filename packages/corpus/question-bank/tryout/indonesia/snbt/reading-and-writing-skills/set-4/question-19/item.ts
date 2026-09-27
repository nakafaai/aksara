import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu tanda genre di setiap meja.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
