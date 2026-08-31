import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "Keeping both translations with a scope note shows Jonas treating meaning as context-dependent rather than hiding the ambiguity behind one choice.",
        },
        {
          isCorrect: false,
          label:
            "Jonas kept two translations and added a note describing where each was appropriate; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
