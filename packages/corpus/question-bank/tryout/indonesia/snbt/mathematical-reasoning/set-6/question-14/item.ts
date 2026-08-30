import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$4$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$5$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$6$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$8$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$9$$ Monate",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$4$$ months" },
        { isCorrect: false, label: "$$5$$ months" },
        { isCorrect: false, label: "$$6$$ months" },
        { isCorrect: false, label: "$$8$$ months" },
        { isCorrect: false, label: "$$9$$ months" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$4$$ bulan" },
        { isCorrect: false, label: "$$5$$ bulan" },
        { isCorrect: false, label: "$$6$$ bulan" },
        { isCorrect: false, label: "$$8$$ bulan" },
        { isCorrect: false, label: "$$9$$ bulan" },
      ],
    },
  },
};

export default item;
