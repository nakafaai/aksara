import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "a ranking of sports by the calories they burn.",
        },
        {
          isCorrect: true,
          label: "when and how to seek additional support for stress.",
        },
        {
          isCorrect: false,
          label: "replacing balanced meals with dietary supplements.",
        },
        {
          isCorrect: false,
          label: "ways to eliminate every source of stress.",
        },
        {
          isCorrect: false,
          label: "the history of international nutrition guidance.",
        },
      ],
    },
  },
};

export default item;
