import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}2$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$4{,}8$$ Minuten",
        },
        {
          isCorrect: true,
          label: "$$16{,}8$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$18{,}8$$ Minuten",
        },
        {
          isCorrect: false,
          label: "$$14{,}2$$ Minuten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1.2$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$4.8$$ minutes",
        },
        {
          isCorrect: true,
          label: "$$16.8$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$18.8$$ minutes",
        },
        {
          isCorrect: false,
          label: "$$14.2$$ minutes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}2$$ menit",
        },
        {
          isCorrect: false,
          label: "$$4{,}8$$ menit",
        },
        {
          isCorrect: true,
          label: "$$16{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$18{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$14{,}2$$ menit",
        },
      ],
    },
  },
};

export default item;
