import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.5$$ mm of rain fell between Monday's and Tuesday's readings.",
        },
        {
          correct: false,
          label:
            "$$9$$ mm of rain fell between Monday's and Tuesday's readings.",
        },
        {
          correct: false,
          label:
            "The rain fell harder on Monday night than it did before Monday's reading.",
        },
        {
          correct: false,
          label:
            "Tuesday's reading would have been the same if the gauge had been emptied on Monday.",
        },
        {
          correct: true,
          label:
            "$$4.5$$ mm of rain fell between Monday's and Tuesday's readings.",
        },
      ],
    },
  },
};

export default item;
