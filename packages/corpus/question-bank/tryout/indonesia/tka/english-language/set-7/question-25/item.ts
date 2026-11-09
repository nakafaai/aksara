import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "reader-response",
  },
  stimulus: "bus-shelters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“Shelters are pointless, because the bus company admits that a new timetable also changed.”",
        },
        {
          correct: false,
          label:
            "“Every bus stop in the country should get a roof immediately.”",
        },
        {
          correct: false,
          label:
            "“The town should spend the money on more buses instead of shelters.”",
        },
        {
          correct: false,
          label: "“Shelters will solve all of the town's transport problems.”",
        },
        {
          correct: true,
          label:
            "“The plan seems sensible, and counting boardings at the new shelters would show whether they help as much as the market roof did.”",
        },
      ],
    },
  },
};

export default item;
