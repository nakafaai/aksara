import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "text-fit",
  },
  stimulus: "bike-tire",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Look along the tube for any cuts you can see before testing it in water.",
        },
        {
          correct: false,
          label: "Spread a thin layer of glue on the back of the patch.",
        },
        {
          correct: false,
          label: "Turn the bicycle the right way up and go for a short ride.",
        },
        {
          correct: false,
          label: "Ask a friend which color of bicycle they like best.",
        },
        {
          correct: false,
          label: "Use a screwdriver to lift the tire off the rim more quickly.",
        },
      ],
    },
  },
};

export default item;
