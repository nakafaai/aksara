import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: true,
          label:
            "Keeping both translations with a scope note shows Jonas treating meaning as context-dependent rather than hiding the ambiguity behind one choice.",
        },
        {
          correct: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
};

export default item;
