import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "technology should replace established classroom practice whenever a digital option is available.",
        },
        {
          isCorrect: true,
          label:
            "successful integration depends on educators making informed judgments about when and how to use a tool.",
        },
        {
          isCorrect: false,
          label:
            "reducing all technology use automatically improves every child's learning experience.",
        },
        {
          isCorrect: false,
          label:
            "drawing on a touch screen always produces stronger learning than drawing on paper.",
        },
        {
          isCorrect: false,
          label:
            "traditional art materials should be removed once digital tools become available.",
        },
      ],
    },
  },
};

export default item;
