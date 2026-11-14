import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "flood-kitchen",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "because the volunteers were too tired to keep cooking",
        },
        {
          correct: false,
          label: "because Pak Yusuf closed the kitchen as a punishment",
        },
        {
          correct: true,
          label:
            "because the water went down and left houses that needed to be cleared of mud",
        },
        {
          correct: false,
          label: "because the families no longer needed any help at all",
        },
        {
          correct: false,
          label: "because the motorbike team refused to keep working",
        },
      ],
    },
  },
};

export default item;
