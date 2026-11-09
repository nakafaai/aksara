import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "golden-record",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Include music only from the town's own region and culture.",
        },
        {
          correct: false,
          label: "Add a map of pulsars to show where the town is located.",
        },
        {
          correct: false,
          label:
            "Write every instruction in today's language so it stays clear.",
        },
        {
          correct: true,
          label: "Explain how to open and use the contents through diagrams.",
        },
        {
          correct: false,
          label: "Fill the capsule only with items that can be found quickly.",
        },
      ],
    },
  },
};

export default item;
