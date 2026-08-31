import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$17$$ Jahre",
        },
        {
          isCorrect: true,
          label: "$$18$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$20$$ Jahre",
        },
        {
          isCorrect: false,
          label: "$$22$$ Jahre",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14$$ years",
        },
        {
          isCorrect: false,
          label: "$$17$$ years",
        },
        {
          isCorrect: true,
          label: "$$18$$ years",
        },
        {
          isCorrect: false,
          label: "$$20$$ years",
        },
        {
          isCorrect: false,
          label: "$$22$$ years",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$17$$ tahun",
        },
        {
          isCorrect: true,
          label: "$$18$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$20$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$22$$ tahun",
        },
      ],
    },
  },
};

export default item;
