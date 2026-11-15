import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "market-scale",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "She lets the narrator learn by losing the stall some money, as long as the lesson sticks.",
        },
        {
          correct: false,
          label:
            "Her generosity has a limit: she will help poorer customers only when it costs the stall nothing.",
        },
        {
          correct: false,
          label:
            "She trusts the narrator more than her own daughter, since she hands the screw to the child.",
        },
        {
          correct: true,
          label:
            "Her rule works in one direction only: a customer may get more than the needle shows but never less, whoever makes the mistake.",
        },
        {
          correct: false,
          label:
            "She has stopped worrying about the inspector, since she now lets a child set the scale.",
        },
      ],
    },
  },
};

export default item;
