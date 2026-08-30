import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$97{,}5$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$95{,}0$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$87{,}5$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$85{,}0$$ km/h",
        },
        {
          isCorrect: true,
          label: "$$82{,}5$$ km/h",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$97.5$$ km/h" },
        { isCorrect: false, label: "$$95.0$$ km/h" },
        { isCorrect: false, label: "$$87.5$$ km/h" },
        { isCorrect: false, label: "$$85.0$$ km/h" },
        { isCorrect: true, label: "$$82.5$$ km/h" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$97{,}5$$ km/jam" },
        { isCorrect: false, label: "$$95{,}0$$ km/jam" },
        { isCorrect: false, label: "$$87{,}5$$ km/jam" },
        { isCorrect: false, label: "$$85{,}0$$ km/jam" },
        { isCorrect: true, label: "$$82{,}5$$ km/jam" },
      ],
    },
  },
};

export default item;
