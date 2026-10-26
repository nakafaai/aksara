import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "repair-workshop",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Speed should take priority when a repair initially appears routine.",
        },
        {
          correct: false,
          label: "Service notes make practical work less reliable.",
        },
        {
          correct: false,
          label:
            "A mentor best protects safety by giving the solution before the learner tests an idea.",
        },
        {
          correct: true,
          label:
            "Patience can prevent unnecessary repairs and repeated mistakes.",
        },
        {
          correct: false,
          label:
            "Measurements are unnecessary when replacement parts look identical.",
        },
      ],
    },
  },
};

export default item;
