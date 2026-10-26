import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Product-life extension as the main measure in a service trial",
        },
        {
          correct: false,
          label: "From a short comparison to a permanent service change",
        },
        {
          correct: true,
          label: "Testing tool cards for cautious repair-café improvement",
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
  stimulus: "passage-2",
};

export default item;
