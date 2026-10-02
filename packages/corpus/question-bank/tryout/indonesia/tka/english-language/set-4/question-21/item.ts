import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To show that the shop owners' worries about cost are based on false information",
        },
        {
          isCorrect: false,
          label:
            "To explain why the measurements were taken on only one street in the town",
        },
        {
          isCorrect: false,
          label:
            "To persuade the shop owners to pay for watering the young trees themselves",
        },
        {
          isCorrect: true,
          label:
            "To admit a real drawback of the plan and show how to manage it",
        },
        {
          isCorrect: false,
          label:
            "To list the tree species that grow best along the sidewalks of the town",
        },
      ],
    },
  },
  stimulusKey: "shade-trees",
};

export default item;
