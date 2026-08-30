import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The Kīholo Bay fishery can be harvested without ecological limits.",
        },
        {
          isCorrect: false,
          label:
            "Every small-scale reef fishery distributes its catch in exactly the same way.",
        },
        {
          isCorrect: false,
          label:
            "Most of the Kīholo Bay catch was sold through commercial markets.",
        },
        {
          isCorrect: false,
          label: "Sharing seafood at cultural events has no social value.",
        },
        {
          isCorrect: true,
          label:
            "Commercial sales records alone would greatly underestimate the fishery's value to the community.",
        },
      ],
    },
  },
};

export default item;
