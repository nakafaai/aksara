import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$127$$ Besucher",
        },
        {
          isCorrect: false,
          label: "$$126$$ Besucher",
        },
        {
          isCorrect: false,
          label: "$$125$$ Besucher",
        },
        {
          isCorrect: false,
          label: "$$124$$ Besucher",
        },
        {
          isCorrect: true,
          label: "$$123$$ Besucher",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$127$$ visitors",
        },
        {
          isCorrect: false,
          label: "$$126$$ visitors",
        },
        {
          isCorrect: false,
          label: "$$125$$ visitors",
        },
        {
          isCorrect: false,
          label: "$$124$$ visitors",
        },
        {
          isCorrect: true,
          label: "$$123$$ visitors",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$127$$ pengunjung",
        },
        {
          isCorrect: false,
          label: "$$126$$ pengunjung",
        },
        {
          isCorrect: false,
          label: "$$125$$ pengunjung",
        },
        {
          isCorrect: false,
          label: "$$124$$ pengunjung",
        },
        {
          isCorrect: true,
          label: "$$123$$ pengunjung",
        },
      ],
    },
  },
};

export default item;
