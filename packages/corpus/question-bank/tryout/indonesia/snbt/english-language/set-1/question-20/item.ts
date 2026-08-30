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
              text: "The Kīholo Bay fishery can be harvested without ecological limits.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every small-scale reef fishery distributes its catch in exactly the same way.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Most of the Kīholo Bay catch was sold through commercial markets.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sharing seafood at cultural events has no social value.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Commercial sales records alone would greatly underestimate the fishery's value to the community.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
