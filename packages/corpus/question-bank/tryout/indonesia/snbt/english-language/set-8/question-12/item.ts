import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a youth translation club.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a youth translation club obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a youth translation club.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents connotation as proof that no follow-up is needed.",
        },
        {
          isCorrect: true,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
