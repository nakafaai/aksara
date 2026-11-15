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
          label: "That Mr Lin had been lying about his job at the hospital.",
        },
        {
          correct: false,
          label: "That Mr Lin had forgotten where he lived after a long shift.",
        },
        {
          correct: false,
          label:
            "That Mr Lin was still following the narrator after she went inside.",
        },
        {
          correct: false,
          label:
            "That Mr Lin turned back down the lane because he did not want to be seen near the house.",
        },
        {
          correct: true,
          label:
            "That Mr Lin may not live past her house at all, and went out of his way to see her home.",
        },
      ],
    },
  },
};

export default item;
