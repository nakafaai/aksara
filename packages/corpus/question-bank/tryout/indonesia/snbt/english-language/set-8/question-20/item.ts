import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a multilingual welcome desk",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a multilingual welcome desk should be ignored",
        },
        {
          isCorrect: true,
          label: "A two-sided card in a multilingual welcome desk",
        },
        {
          isCorrect: false,
          label: "The complete world history of metaphor",
        },
        {
          isCorrect: false,
          label: "One rule for every a multilingual welcome desk",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
