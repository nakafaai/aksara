import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair mainly by defining a technical term, with the proposed change serving only as background information.",
        },
        {
          correct: true,
          label:
            "The repair café compared tool-list cards across measured conditions, consulted the people involved, and supported only a limited extension because repair difficulty varied by object.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
