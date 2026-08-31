import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The recurring object gains meaning mainly from its physical description rather than its relation to the choice.",
        },
        {
          isCorrect: false,
          label:
            "The ending shows that the setting, rather than the character's action, resolves the conflict.",
        },
        {
          isCorrect: true,
          label:
            "The rain-spotted card gains meaning through its failed description, Asha's cuts, and the shorter message reaching the final house in time.",
        },
        {
          isCorrect: false,
          label:
            "The object's meaning remains fixed even though the character uses it differently.",
        },
        {
          isCorrect: false,
          label:
            "The final action matters because it confirms the interpretation established at the start.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
