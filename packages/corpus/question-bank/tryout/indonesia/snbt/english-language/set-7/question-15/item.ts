import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a residents' workshop",
        },
        {
          isCorrect: false,
          label: "Why all evidence in a residents' workshop should be ignored",
        },
        {
          isCorrect: true,
          label: "Priya's next step in a residents' workshop",
        },
        {
          isCorrect: false,
          label: "The complete world history of cognitive load",
        },
        {
          isCorrect: false,
          label: "One rule for every a residents' workshop",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
