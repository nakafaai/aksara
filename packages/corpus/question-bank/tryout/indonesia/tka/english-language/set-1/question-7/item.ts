import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A workshop focuses on stocking spare chains before asking owners about recurring faults.",
        },
        {
          correct: false,
          label: "A child teaches Sari how to repair a rear wheel.",
        },
        {
          correct: true,
          label:
            "A volunteer learns that careful diagnosis matters more than replacing parts quickly.",
        },
        {
          correct: false,
          label: "The writer spends a week buying new bicycles.",
        },
        {
          correct: false,
          label:
            "The workshop measures successful learning by the number of new components installed.",
        },
      ],
    },
  },
  stimulus: "repair-workshop",
};

export default item;
