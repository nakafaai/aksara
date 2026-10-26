import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "System alignment as the main measure in a service trial",
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
          correct: true,
          label: "Aligning waste symbols across a changing night market",
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
