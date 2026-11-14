import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "bus-shelters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to describe the bus route through the town of Wiraguna",
        },
        {
          correct: false,
          label: "to report the results of the bus company's ticket records",
        },
        {
          correct: false,
          label: "to argue that the town needs more buses on its main route",
        },
        {
          correct: true,
          label:
            "to persuade the council to build shelters at the five busiest uncovered stops",
        },
        {
          correct: false,
          label: "to complain about litter and graffiti at bus stops",
        },
      ],
    },
  },
};

export default item;
