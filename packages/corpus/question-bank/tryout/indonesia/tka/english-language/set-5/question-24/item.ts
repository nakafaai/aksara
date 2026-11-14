import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "swim-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The writer rejects the parents' concern as unimportant.",
        },
        {
          correct: false,
          label:
            "The writer asks the school to build a pool next to the sports field.",
        },
        {
          correct: true,
          label:
            "The writer accepts a concern about cost and suggests using the nearby town pool and starting small.",
        },
        {
          correct: false,
          label:
            "The writer reports new results from the sports club's course.",
        },
        {
          correct: false,
          label: "The writer explains the rules for swimming at the town pool.",
        },
      ],
    },
  },
};

export default item;
