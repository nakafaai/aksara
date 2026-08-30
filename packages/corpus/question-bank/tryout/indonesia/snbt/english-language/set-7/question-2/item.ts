import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in leaf growth under different light colours.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in leaf growth under different light colours obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to leaf growth under different light colours.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents confounding variable as proof that no follow-up is needed.",
        },
        {
          isCorrect: true,
          label: "The mean result with the change was 19.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
