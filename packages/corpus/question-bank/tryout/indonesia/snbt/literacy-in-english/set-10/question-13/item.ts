import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A responsible budget should remain unchanged until every uncertain price becomes final.",
        },
        {
          isCorrect: false,
          label:
            "Deleting one optional item solved the problem independently of the labels, scenarios, and confirmation dates.",
        },
        {
          isCorrect: true,
          label:
            "The budget became more useful when uncertainty was recorded, linked to consequences, and assigned a next action.",
        },
        {
          isCorrect: false,
          label:
            "Uncertain figures are safest when they remain inside one balanced total until the planning team can present a final answer.",
        },
        {
          isCorrect: false,
          label:
            "A contingency is useful mainly because it postpones every unresolved choice until after the event.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
