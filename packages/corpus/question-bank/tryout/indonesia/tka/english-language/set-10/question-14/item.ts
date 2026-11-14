import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "wrong-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "She asked the driver whether the bus went to the clock tower.",
        },
        { correct: false, label: "She called her mother right away." },
        {
          correct: true,
          label: "She got off at the next stop and crossed the road.",
        },
        {
          correct: true,
          label:
            "She kept her book in her bag on the Bus 7 that she found at the market.",
        },
      ],
    },
  },
};

export default item;
