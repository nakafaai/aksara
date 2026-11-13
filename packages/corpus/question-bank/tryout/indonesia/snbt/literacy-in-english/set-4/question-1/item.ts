import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "otter-kelp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Both of its claims hold, although the early island evidence behind them was weaker than textbooks admit.",
        },
        {
          correct: false,
          label:
            "It should be set aside, because researchers still disagree about what removed the Aleutian otters.",
        },
        {
          correct: false,
          label:
            "Its claim about returning otters is well supported, while its claim about losing them rests on one comparison.",
        },
        {
          correct: true,
          label:
            "Its claim about losing otters holds up, but its promise that returning otters bring back the forest is doubtful once barrens exist.",
        },
        {
          correct: false,
          label:
            "It exaggerates the role of otters, since heatwaves and disease, not predators, now cause most of the kelp loss.",
        },
      ],
    },
  },
};

export default item;
