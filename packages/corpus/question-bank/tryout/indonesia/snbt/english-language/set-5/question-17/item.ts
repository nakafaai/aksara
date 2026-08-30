import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a food pantry at closing time.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a food pantry at closing time obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a food pantry at closing time.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents motif as proof that no follow-up is needed.",
        },
        {
          isCorrect: true,
          label: "Samira wrote the entry date on the last unmarked package.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
