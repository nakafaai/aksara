import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "night-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He waited in plain view until she had the door open, then lifted one hand in goodbye.",
        },
        {
          correct: false,
          label: "Her mother worked at the same hospital as Mr Lin.",
        },
        {
          correct: true,
          label: "He got off at her stop and walked up the lane behind her.",
        },
        {
          correct: false,
          label:
            "He walked back down the lane towards the main road when she was inside.",
        },
        {
          correct: false,
          label:
            "By the time she reached the gate she had her keys between her fingers.",
        },
      ],
    },
  },
};

export default item;
