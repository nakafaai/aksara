import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$36$$ Leute",
        },
        {
          isCorrect: false,
          label: "$$60$$ Leute",
        },
        {
          isCorrect: false,
          label: "$$48$$ Leute",
        },
        {
          isCorrect: false,
          label: "$$30$$ Leute",
        },
        {
          isCorrect: false,
          label: "$$20$$ Leute",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$36$$ People",
        },
        {
          isCorrect: false,
          label: "$$60$$ People",
        },
        {
          isCorrect: false,
          label: "$$48$$ People",
        },
        {
          isCorrect: false,
          label: "$$30$$ People",
        },
        {
          isCorrect: false,
          label: "$$20$$ People",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$36$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$60$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$48$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$30$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$20$$ Orang",
        },
      ],
    },
  },
};

export default item;
