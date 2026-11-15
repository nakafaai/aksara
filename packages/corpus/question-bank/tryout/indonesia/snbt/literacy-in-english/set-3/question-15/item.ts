import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "bus-punctuality",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Southway, because its overall on-time rate is seven points higher than Northline's.",
        },
        {
          correct: false,
          label:
            "Southway, because it ran more trips on time in total than Northline did.",
        },
        {
          correct: false,
          label:
            "Northline, because it ran far more urban trips, which are the harder trips to run.",
        },
        {
          correct: true,
          label:
            "Northline, because it was more punctual on both kinds of route, and its lower overall rate comes from being given most of the urban routes.",
        },
        {
          correct: false,
          label:
            "Neither, because trips on different kinds of route cannot be compared at all.",
        },
      ],
    },
  },
};

export default item;
