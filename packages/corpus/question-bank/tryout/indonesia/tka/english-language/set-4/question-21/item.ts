import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that the shop owners' worries about cost are based on false information",
        },
        {
          correct: false,
          label:
            "To explain why the measurements were taken on only one street in the town",
        },
        {
          correct: false,
          label:
            "To persuade the shop owners to pay for watering the young trees themselves",
        },
        {
          correct: true,
          label:
            "To admit a real drawback of the plan and show how to manage it",
        },
        {
          correct: false,
          label:
            "To list the tree species that grow best along the sidewalks of the town",
        },
      ],
    },
  },
  stimulus: "shade-trees",
};

export default item;
