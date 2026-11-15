import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "character",
  },
  stimulus: "ridge-turnaround",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "He keeps to his rule even when Raka says the summit is only an hour away.",
        },
        {
          correct: true,
          label: "He lets the slowest walker set the group's pace.",
        },
        {
          correct: false,
          label: "He argues with Raka about whether to go on.",
        },
        {
          correct: false,
          label: "He makes the turning decision himself at noon.",
        },
        {
          correct: false,
          label: "He turns the group around because he sees the cloud coming.",
        },
      ],
    },
  },
};

export default item;
