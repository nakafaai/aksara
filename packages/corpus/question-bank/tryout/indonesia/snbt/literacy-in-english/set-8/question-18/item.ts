import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
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
          correct: true,
          label:
            "The two-sided card gains meaning through the contrast between home and public speech, Mei's decision to keep both, and her context-based use at the desk.",
        },
        {
          correct: false,
          label:
            "The object's meaning remains fixed even though the character uses it differently.",
        },
        {
          correct: false,
          label:
            "The final action matters because it confirms the interpretation established at the start.",
        },
      ],
    },
  },
};

export default item;
