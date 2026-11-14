import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rina could hear herself clearly in her headphones throughout the broadcast.",
        },
        {
          correct: true,
          label: "No sound reached the speakers in the classrooms.",
        },
        {
          correct: false,
          label: "The club's own recording of the broadcast was complete.",
        },
        {
          correct: true,
          label:
            "The exam room changes had to be read again at the first break.",
        },
        {
          correct: true,
          label: "Pak Hadi knocked on the studio window during the broadcast.",
        },
      ],
    },
  },
};

export default item;
