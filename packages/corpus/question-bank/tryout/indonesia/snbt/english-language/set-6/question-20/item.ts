import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a repair café during a storm",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a repair café during a storm should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of sensory imagery",
        },
        {
          isCorrect: false,
          label: "One rule for every a repair café during a storm",
        },
        {
          isCorrect: true,
          label: "A spool of gold thread in a repair café during a storm",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
