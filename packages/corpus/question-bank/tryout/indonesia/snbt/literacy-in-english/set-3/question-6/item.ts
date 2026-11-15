import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "bag-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Plastic use in the city has fallen since the charge began.",
        },
        {
          correct: false,
          label:
            "Households that used carrier bags to line their bins now buy bin liners instead.",
        },
        {
          correct: false,
          label:
            "No earlier campaign changed shopping habits as quickly as the charge has.",
        },
        {
          correct: false,
          label:
            "Extending the charge to paper bags would be a sensible next step.",
        },
        {
          correct: true,
          label:
            "The weight of the carrier bags no longer handed out overstates how much plastic the city has stopped using.",
        },
      ],
    },
  },
};

export default item;
