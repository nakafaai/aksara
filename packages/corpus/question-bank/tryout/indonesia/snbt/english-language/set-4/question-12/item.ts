import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a community sports centre.",
        },
        {
          isCorrect: true,
          label:
            "Omar tested the route at wheelchair height and marked every place where a sign disappeared from view.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a community sports centre obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a community sports centre.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents co-design as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
