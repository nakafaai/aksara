import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "volcano-hike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The writer saw how steep the trail really was.",
        },
        {
          correct: false,
          label: "The group started up the trail at two in the morning.",
        },
        {
          correct: false,
          label: "The sky turned orange behind a line of mountains.",
        },
        { correct: true, label: "Fajar slipped and lost his water bottle." },
        {
          correct: false,
          label: "Bu Endah said the group could stay for only twenty minutes.",
        },
      ],
    },
  },
};

export default item;
