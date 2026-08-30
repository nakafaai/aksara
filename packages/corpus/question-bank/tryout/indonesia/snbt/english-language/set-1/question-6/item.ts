import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "technology should replace established classroom practice whenever a digital option is available.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "successful integration depends on educators making informed judgments about when and how to use a tool.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "reducing all technology use automatically improves every child's learning experience.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "drawing on a touch screen always produces stronger learning than drawing on paper.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "traditional art materials should be removed once digital tools become available.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
