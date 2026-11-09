import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "cave-visit",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "They dissolved because water kept dripping on them.",
        },
        {
          correct: true,
          label:
            "Visitors in the past were allowed to break off pieces and take them home.",
        },
        {
          correct: false,
          label: "Oil from visitors' hands stopped them from growing.",
        },
        {
          correct: false,
          label: "They were destroyed when the concrete steps were built.",
        },
        {
          correct: false,
          label: "Guides removed them to make the path safer for students.",
        },
      ],
    },
  },
};

export default item;
