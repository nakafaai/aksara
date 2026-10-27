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
            "A responsible budget should remain unchanged until every uncertain price becomes final.",
        },
        {
          correct: false,
          label:
            "Deleting one optional item solved the problem independently of the labels, scenarios, and confirmation dates.",
        },
        {
          correct: true,
          label:
            "The budget became more useful when uncertainty was recorded, linked to consequences, and assigned a next action.",
        },
        {
          correct: false,
          label:
            "Uncertain figures are safest when they remain inside one balanced total until the planning team can present a final answer.",
        },
        {
          correct: false,
          label:
            "A contingency is useful mainly because it postpones every unresolved choice until after the event.",
        },
      ],
    },
  },
};

export default item;
