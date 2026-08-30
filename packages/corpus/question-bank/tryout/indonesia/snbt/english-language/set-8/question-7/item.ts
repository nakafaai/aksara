import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a multilingual youth translation club.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a multilingual youth translation club obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a multilingual youth translation club.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 20.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents register as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
