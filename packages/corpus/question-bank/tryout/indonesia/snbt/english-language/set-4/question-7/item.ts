import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a local history display.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a local history display obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a local history display.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 18.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents plain language as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
