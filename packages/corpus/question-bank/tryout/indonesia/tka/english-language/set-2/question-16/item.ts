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
          isCorrect: true,
          label:
            "Use the second meeting place because it anticipates closures around the neighborhood.",
        },
        {
          isCorrect: false,
          label:
            "Remain at the first meeting place because one safe point should replace every other route.",
        },
        {
          isCorrect: false,
          label:
            "Choose any distant place because greater distance automatically makes it safe for everyone.",
        },
        {
          isCorrect: false,
          label:
            "Discard the paper cards because they can be used only inside the neighborhood.",
        },
        {
          isCorrect: false,
          label:
            "Wait for the out-of-area contact to select a new meeting place without consulting the household.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
