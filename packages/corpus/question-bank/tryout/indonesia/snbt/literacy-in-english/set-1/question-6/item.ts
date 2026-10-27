import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "technology should replace established classroom practice whenever a digital option is available.",
        },
        {
          correct: false,
          label:
            "reducing all technology use automatically improves every child's learning experience.",
        },
        {
          correct: true,
          label:
            "successful integration depends on educators making informed judgments about when and how to use a tool.",
        },
        {
          correct: false,
          label:
            "drawing on a touch screen always produces stronger learning than drawing on paper.",
        },
        {
          correct: false,
          label:
            "traditional art materials should be removed once digital tools become available.",
        },
      ],
    },
  },
};

export default item;
