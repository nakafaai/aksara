import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Speed should take priority when a repair initially appears routine.",
        },
        {
          isCorrect: false,
          label: "Service notes make practical work less reliable.",
        },
        {
          isCorrect: false,
          label:
            "A mentor best protects safety by giving the solution before the learner tests an idea.",
        },
        {
          isCorrect: true,
          label:
            "Patience can prevent unnecessary repairs and repeated mistakes.",
        },
        {
          isCorrect: false,
          label:
            "Measurements are unnecessary when replacement parts look identical.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
