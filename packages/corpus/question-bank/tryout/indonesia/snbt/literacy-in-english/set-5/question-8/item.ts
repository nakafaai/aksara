import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A series of four reactors would produce electricity cheaply enough to match new wind and solar when the two are compared plant by plant.",
        },
        {
          correct: false,
          label:
            "Whether the country goes on to build a fourth reactor should depend on whether the first three are finished on time and on budget.",
        },
        {
          correct: true,
          label:
            "A later reactor can avoid the delays and costs of the first only if the country keeps building, so that its crews gain the experience they lack.",
        },
        {
          correct: false,
          label:
            "Nobody can know what a fourth reactor would cost until the first one has been finished and the size of its overrun has been measured.",
        },
        {
          correct: false,
          label:
            "Countries that stopped building reactors for a generation cannot win back the skills they lost, however many new reactors they decide to build and however long they keep the crews together.",
        },
      ],
    },
  },
};

export default item;
