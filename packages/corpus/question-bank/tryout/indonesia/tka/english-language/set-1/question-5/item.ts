import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "They were given in metres and later checked by the boatman.",
        },
        {
          correct: false,
          label:
            "They put the mosque nearer to the well than the school gate was.",
        },
        {
          correct: false,
          label:
            "They were correct on Laras's map because she drew each step at her own stride.",
        },
        {
          correct: false,
          label:
            "They prove that the minaret stood exactly $$90$$ of Laras's steps from the well.",
        },
        {
          correct: true,
          label:
            "They were counted in a young child's steps, so the distances on Laras's map came out too long.",
        },
      ],
    },
  },
};

export default item;
