import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a residents' workshop.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a residents' workshop obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a residents' workshop.",
        },
        {
          isCorrect: true,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour unfamiliar with the route.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents cognitive load as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
