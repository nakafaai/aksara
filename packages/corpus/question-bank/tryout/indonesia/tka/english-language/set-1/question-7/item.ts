import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A workshop focuses on stocking spare chains before asking owners about recurring faults.",
        },
        {
          isCorrect: false,
          label: "A child teaches Sari how to repair a rear wheel.",
        },
        {
          isCorrect: true,
          label:
            "A volunteer learns that careful diagnosis matters more than replacing parts quickly.",
        },
        {
          isCorrect: false,
          label: "The writer spends a week buying new bicycles.",
        },
        {
          isCorrect: false,
          label:
            "The workshop measures successful learning by the number of new components installed.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
