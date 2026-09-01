import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To make the meter move faster so the second test can locate a hidden pipe",
        },
        {
          isCorrect: true,
          label:
            "To separate evidence of ongoing flow from the one known accidental use",
        },
        {
          isCorrect: false,
          label:
            "To prove that any second movement must come from the exact pipe behind the wall",
        },
        {
          isCorrect: false,
          label:
            "To reset the irrigation timer after the test, regardless of whether it was scheduled to run",
        },
        {
          isCorrect: false,
          label:
            "To stop the first recorded number from mathematically influencing the later reading",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
