import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "grading-curve",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teachers should be paid more for grading against detailed standards.",
        },
        {
          correct: true,
          label:
            "A curve is easy to run, but it teaches students to value beating others.",
        },
        {
          correct: false,
          label:
            "Students should learn to value simple answers over complicated ones.",
        },
        {
          correct: false,
          label:
            "Simple tests are better than difficult tests for students of every level.",
        },
        {
          correct: false,
          label:
            "Students might learn more if their teachers had fewer papers to read.",
        },
      ],
    },
  },
};

export default item;
