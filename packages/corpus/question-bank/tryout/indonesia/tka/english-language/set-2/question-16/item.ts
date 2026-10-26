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
          correct: true,
          label:
            "Use the second meeting place because it is outside the immediate neighborhood.",
        },
        {
          correct: false,
          label:
            "Remain at the first meeting place because one safe point should replace every other route.",
        },
        {
          correct: false,
          label:
            "Choose any distant place because greater distance automatically makes it safe for everyone.",
        },
        {
          correct: false,
          label:
            "Discard the paper cards because they can be used only inside the neighborhood.",
        },
        {
          correct: false,
          label:
            "Wait for the out-of-area contact to select a new meeting place without consulting the household.",
        },
      ],
    },
  },
  stimulus: "emergency-plan",
};

export default item;
