import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Water exercise can be helpful for some people with arthritis.",
        },
        {
          correct: false,
          label: "Water exercise may improve older adults' quality of life.",
        },
        {
          correct: false,
          label: "Swimming may improve mood for some people.",
        },
        {
          correct: true,
          label: "Swimming has health benefits and therefore carries no risks.",
        },
        {
          correct: false,
          label: "A balanced decision includes suitable safety measures.",
        },
      ],
    },
  },
};

export default item;
