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
          isCorrect: false,
          label:
            "The object's meaning remains fixed even though the character uses it differently.",
        },
        {
          isCorrect: true,
          label:
            "The blank card gains meaning through the curator's hesitation, Eli's invitation to look, and the visitors' closer observation.",
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
