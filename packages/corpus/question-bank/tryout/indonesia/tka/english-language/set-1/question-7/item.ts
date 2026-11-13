import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The bottle leaked slowly through a crack near its domed base.",
        },
        {
          correct: false,
          label:
            "Some of the water evaporated while the pours were being made.",
        },
        {
          correct: false,
          label:
            "The bottle's straight section was narrower than the funnel opening.",
        },
        {
          correct: true,
          label:
            "Dimas stood over the cylinder, so each pour he measured held less water than it should have.",
        },
        {
          correct: false,
          label:
            "Dimas knelt beside the table, so he could not see the lines on the cylinder clearly.",
        },
      ],
    },
  },
};

export default item;
