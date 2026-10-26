import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Actionable information as the main measure in a service trial",
        },
        {
          correct: true,
          label: "What a drill can show about a clearer flood alert",
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
  stimulus: "passage-2",
};

export default item;
