import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$85$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$95$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$80$$ km/h",
        },
        {
          isCorrect: true,
          label: "$$75$$ km/h",
        },
        {
          isCorrect: false,
          label: "$$90$$ km/h",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$85$$ km/h" },
        { isCorrect: false, label: "$$95$$ km/h" },
        { isCorrect: false, label: "$$80$$ km/h" },
        { isCorrect: true, label: "$$75$$ km/h" },
        { isCorrect: false, label: "$$90$$ km/h" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$85$$ km/jam" },
        { isCorrect: false, label: "$$95$$ km/jam" },
        { isCorrect: false, label: "$$80$$ km/jam" },
        { isCorrect: true, label: "$$75$$ km/jam" },
        { isCorrect: false, label: "$$90$$ km/jam" },
      ],
    },
  },
};

export default item;
