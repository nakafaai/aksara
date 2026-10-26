import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  stimulus: "accessible-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Signs were lowered.",
        },
        {
          correct: false,
          label:
            "Every display was moved out of the experiment room after the test walk.",
        },
        {
          correct: true,
          label: "Pale text was replaced with darker lettering.",
        },
        {
          correct: false,
          label: "The portable ramp was permanently removed.",
        },
      ],
    },
  },
};

export default item;
