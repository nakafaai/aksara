import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Testing date labels for cautious pantry stock rotation",
        },
        {
          correct: false,
          label: "Stock rotation as the main measure in a service trial",
        },
        {
          correct: false,
          label: "From a short comparison to a permanent service change",
        },
        {
          correct: false,
          label: "Consultation without comparable outcome measures",
        },
        {
          correct: false,
          label: "A local service trial with no follow-up decision",
        },
      ],
    },
  },
};

export default item;
