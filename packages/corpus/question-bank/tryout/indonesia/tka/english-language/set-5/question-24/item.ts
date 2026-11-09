import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "phone-free-lunch",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer rejects the idea that students need time to relax.",
        },
        {
          correct: false,
          label:
            "The writer asks the school to collect phones for the whole day.",
        },
        {
          correct: true,
          label:
            "The writer accepts a counterargument but limits the rule to lunch break.",
        },
        {
          correct: false,
          label: "The writer reports new survey results about relaxation.",
        },
        {
          correct: false,
          label:
            "The writer explains how to use the phone in the school office.",
        },
      ],
    },
  },
};

export default item;
