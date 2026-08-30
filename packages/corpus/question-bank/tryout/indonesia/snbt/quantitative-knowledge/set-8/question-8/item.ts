import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$3$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$4$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$5$$ Jahre",
        },
        {
          isCorrect: true,
          label: "$$6$$ Jahre",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ years",
        },
        {
          isCorrect: false,
          label: "$$3$$ years",
        },
        {
          isCorrect: false,
          label: "$$4$$ years",
        },
        {
          isCorrect: false,
          label: "$$5$$ years",
        },
        {
          isCorrect: true,
          label: "$$6$$ years",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$3$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$4$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$5$$ tahun",
        },
        {
          isCorrect: true,
          label: "$$6$$ tahun",
        },
      ],
    },
  },
};

export default item;
