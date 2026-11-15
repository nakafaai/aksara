import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "island-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A passenger whose outward trip is on a Monday can still make the trip back on the following Sunday with a return ticket.",
        },
        {
          correct: false,
          label:
            "A passenger whose outward trip is on a Monday can still make the trip back on the following Monday with a return ticket.",
        },
        {
          correct: true,
          label: "On a normal day, the ferry spends $$6$$ hours at sea.",
        },
        {
          correct: false,
          label: "The first ferry from Pulau Lima leaves at 8:00 every day.",
        },
        {
          correct: false,
          label: "A child of $$12$$ travels at the child fare.",
        },
      ],
    },
  },
};

export default item;
