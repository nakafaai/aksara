import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in the school media room.",
        },
        {
          isCorrect: true,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in the school media room obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to the school media room.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents self-efficacy as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
