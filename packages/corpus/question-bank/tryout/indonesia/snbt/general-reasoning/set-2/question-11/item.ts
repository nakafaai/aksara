import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}1$$ Millionen Tonnen",
        },
        {
          isCorrect: true,
          label: "$$1{,}8$$ Millionen Tonnen",
        },
        {
          isCorrect: false,
          label: "$$2{,}5$$ Millionen Tonnen",
        },
        {
          isCorrect: false,
          label: "$$3{,}0$$ Millionen Tonnen",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$1.1$$ million tons" },
        { isCorrect: true, label: "$$1.8$$ million tons" },
        { isCorrect: false, label: "$$2.5$$ million tons" },
        { isCorrect: false, label: "$$3.0$$ million tons" },
        { isCorrect: false, label: "Cannot be determined" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$1{,}1$$ juta ton" },
        { isCorrect: true, label: "$$1{,}8$$ juta ton" },
        { isCorrect: false, label: "$$2{,}5$$ juta ton" },
        { isCorrect: false, label: "$$3{,}0$$ juta ton" },
        { isCorrect: false, label: "Tidak dapat ditentukan" },
      ],
    },
  },
};

export default item;
