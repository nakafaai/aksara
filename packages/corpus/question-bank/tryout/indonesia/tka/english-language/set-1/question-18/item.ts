import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To make the meter move faster so the second test can locate a hidden pipe",
        },
        {
          correct: true,
          label:
            "To separate evidence of ongoing flow from the one known accidental use",
        },
        {
          correct: false,
          label:
            "To prove that any second movement must come from the exact pipe behind the wall",
        },
        {
          correct: false,
          label:
            "To reset the irrigation timer after the test, regardless of whether it was scheduled to run",
        },
        {
          correct: false,
          label:
            "To stop the first recorded number from mathematically influencing the later reading",
        },
      ],
    },
  },
  stimulus: "leak-test",
};

export default item;
