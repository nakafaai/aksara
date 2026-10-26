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
          correct: true,
          label:
            "The rain-spotted card gains meaning through its missing route, Asha's revision to add clear directions, and the message reaching the final house in time.",
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
  stimulus: "passage-4",
};

export default item;
