import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3{,}6$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$7{,}2$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$7{,}8$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$8{,}0$$ Minuten",
        },
        {
          isCorrect: true,
          label: "$$4{,}8$$ Minuten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3.6$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$7.2$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$7.8$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$8.0$$ minutes",
        },
        {
          isCorrect: true,
          label: "$$4.8$$ minutes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3{,}6$$ menit",
        },
        {
          isCorrect: false,
          label: "$$7{,}2$$ menit",
        },
        {
          isCorrect: false,
          label: "$$7{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$8{,}0$$ menit",
        },
        {
          isCorrect: true,
          label: "$$4{,}8$$ menit",
        },
      ],
    },
  },
};

export default item;
