import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Text 1 treats them as proof that homework harms attainment, and Text 2 rejects them because the pilot lasted only one term.",
        },
        {
          correct: false,
          label:
            "Text 1 treats them as decisive only for Years 3 to 6, and Text 2 agrees but adds that the bedtime figures say more.",
        },
        {
          correct: true,
          label:
            "Text 1 treats them as settling the debate for every age, while Text 2 says they tell less than they seem, though it still backs the change for the youngest on other grounds.",
        },
        {
          correct: false,
          label:
            "Text 1 gives them the same weight as the bedtime figures, and Text 2 questions the bedtime figures but accepts the scores.",
        },
        {
          correct: false,
          label:
            "Text 1 treats them as settling the debate for every age, and Text 2 rejects them outright as showing nothing about homework.",
        },
      ],
    },
  },
};

export default item;
