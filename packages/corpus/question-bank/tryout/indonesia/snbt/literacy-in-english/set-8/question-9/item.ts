import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "congestion-charge",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "On streets of the centre where ride-hailing cars are rarely seen, speeds have fallen as much as on the streets where they are common.",
        },
        {
          column: 2,
          label:
            "Speeds have fallen most at the times of day when ride-hailing cars are most numerous.",
        },
        {
          column: 1,
          label:
            "Over the same two years, the city closed one lane on each main road in the centre to build cycle paths.",
        },
        {
          column: 2,
          label:
            "Ride-hailing cars spend about a third of their time driving empty between passengers.",
        },
        {
          column: 2,
          label:
            "Buses now run more slowly through the centre than they did in the first year of the charge.",
        },
      ],
    },
  },
};

export default item;
