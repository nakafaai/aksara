import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The recurring object gains meaning mainly from its physical description rather than its relation to the choice.",
        },
        {
          correct: false,
          label:
            "The ending shows that the setting, rather than the character's action, resolves the conflict.",
        },
        {
          correct: false,
          label:
            "The object's meaning remains fixed even though the character uses it differently.",
        },
        {
          correct: true,
          label:
            "The blank card gains meaning through the curator's hesitation, Eli's invitation to look, and the visitors' closer observation.",
        },
        {
          correct: false,
          label:
            "The final action matters because it confirms the interpretation established at the start.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
