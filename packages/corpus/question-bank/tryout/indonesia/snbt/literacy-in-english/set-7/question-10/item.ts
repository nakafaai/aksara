import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "classroom-points",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A weekly ranking that shows each pupil's points on the classroom wall",
        },
        {
          correct: false,
          label:
            "A badge for every pupil who completes ten worksheets in a row without a mistake",
        },
        {
          correct: false,
          label:
            "A prize for the pupil who reads the most books by the end of term",
        },
        {
          correct: true,
          label:
            "A puzzle that gives instant hints and lets pupils retry until they solve it",
        },
        {
          correct: false,
          label:
            "A test that pupils may only attempt once, with no feedback until later",
        },
      ],
    },
  },
};

export default item;
