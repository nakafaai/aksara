import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a repair café during a storm.",
        },
        {
          isCorrect: true,
          label:
            "Miles left one repaired seam visible instead of colouring it to match.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a repair café during a storm obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a repair café during a storm.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents sensory imagery as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
