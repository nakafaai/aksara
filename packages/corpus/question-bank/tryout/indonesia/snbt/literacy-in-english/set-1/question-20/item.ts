import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The Kīholo Bay fishery can be harvested without ecological limits.",
        },
        {
          correct: true,
          label:
            "Commercial sales records alone would greatly underestimate the fishery's value to the community.",
        },
        {
          correct: false,
          label:
            "Every small-scale reef fishery distributes its catch in exactly the same way.",
        },
        {
          correct: false,
          label:
            "Most of the Kīholo Bay catch was sold through commercial markets.",
        },
        {
          correct: false,
          label: "Sharing seafood at cultural events has no social value.",
        },
      ],
    },
  },
};

export default item;
