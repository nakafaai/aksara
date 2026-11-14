import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "borrowed-camera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It is a fantasy, because a gull stays frozen in the air.",
        },
        {
          correct: false,
          label:
            "It is a fantasy, because a camera cannot be limited to twenty-four pictures.",
        },
        {
          correct: false,
          label:
            "It is realistic only at the beginning, because the prize at the end is magical.",
        },
        {
          correct: false,
          label:
            "It is a fairy tale, because it ends with a lesson about patience.",
        },
        {
          correct: true,
          label:
            "It is realistic, because every event in it could happen in everyday life.",
        },
      ],
    },
  },
};

export default item;
