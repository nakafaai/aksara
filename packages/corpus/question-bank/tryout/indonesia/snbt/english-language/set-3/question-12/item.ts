import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: true,
          label:
            "By narrowing the plan to one interview and recording the missing evidence, Leah replaces avoidance with a bounded action whose result can be reviewed.",
        },
        {
          isCorrect: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
