import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "volcano-hike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "By the third break, the climb had tired the writer so much that the rests felt necessary.",
        },
        {
          correct: false,
          label:
            "Bu Endah explained that the breaks were for taking photos of the forest.",
        },
        {
          correct: false,
          label:
            "The writer's cousin had lost his water bottle and needed to rest.",
        },
        {
          correct: false,
          label: "The wind had become too strong to keep walking.",
        },
        {
          correct: false,
          label: "The forest was too dark for anyone to walk without stopping.",
        },
      ],
    },
  },
};

export default item;
