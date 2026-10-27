import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "archive-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A volunteer completes the identifications before attaching source notes.",
        },
        {
          correct: false,
          label:
            "The archivist stores contributor notes separately to keep the main database consistent.",
        },
        {
          correct: false,
          label:
            "A box of photographs is discarded because most names are unknown.",
        },
        {
          correct: true,
          label:
            "A volunteer learns to separate observation, memory, and uncertainty in archive records.",
        },
        {
          correct: false,
          label: "The writer spends the week repairing a railway station.",
        },
      ],
    },
  },
};

export default item;
