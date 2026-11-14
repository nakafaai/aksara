import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "water-filter",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "a list of materials, the purpose of the activity, numbered steps, and a safety warning",
        },
        {
          correct: false,
          label:
            "numbered steps, a list of materials, and the results of an experiment",
        },
        {
          correct: true,
          label:
            "the purpose and a safety warning, a list of materials, numbered steps, and final advice",
        },
        {
          correct: false,
          label: "a problem, arguments for and against, and a recommendation",
        },
        {
          correct: false,
          label: "an orientation, a series of events, and a personal comment",
        },
      ],
    },
  },
};

export default item;
