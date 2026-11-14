import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "repot-plant",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "loosening the outer roots and cutting off any black, soft ones",
        },
        {
          correct: false,
          label: "watering slowly until water drains out of the bottom",
        },
        { correct: false, label: "watering the plant lightly the day before" },
        { correct: false, label: "pressing the fresh soil down lightly" },
        {
          correct: false,
          label: "keeping the plant out of strong sunlight for a week",
        },
      ],
    },
  },
};

export default item;
