import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "beach-cleanup",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "the volunteers meeting at the parking area" },
        {
          correct: false,
          label: "Kak Dewi dividing the volunteers into groups of five",
        },
        {
          correct: false,
          label: "the writer thinking about the wrappers on the way home",
        },
        {
          correct: false,
          label:
            "Kak Dewi explaining that much of the waste came down the river",
        },
        {
          correct: true,
          label:
            "the writer's group counting wrappers, straws, and bottles near the river mouth",
        },
      ],
    },
  },
};

export default item;
