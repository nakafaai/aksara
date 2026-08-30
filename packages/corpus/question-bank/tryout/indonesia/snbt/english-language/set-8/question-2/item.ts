import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in load distribution in paper bridge models.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in load distribution in paper bridge models obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to load distribution in paper bridge models.",
        },
        {
          isCorrect: true,
          label: "The mean result with the change was 39.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents truss as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
