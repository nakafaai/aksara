import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Caleb labelled each estimate and created a separate line for costs that could change; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Caleb labelled each estimate and created a separate line for costs that could change; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: true,
          label:
            "Separating changeable costs from labelled estimates lets Caleb keep the budget revisable without pretending that uncertain figures are final.",
        },
        {
          isCorrect: false,
          label:
            "Caleb labelled each estimate and created a separate line for costs that could change; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Caleb labelled each estimate and created a separate line for costs that could change; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
