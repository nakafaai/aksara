import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "repot-plant",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "so that the roots can grow out through the drainage holes",
        },
        {
          correct: false,
          label: "so that the pot looks larger than the old one",
        },
        {
          correct: true,
          label:
            "so that there is room for water and it does not spill over the rim when the plant is watered",
        },
        { correct: false, label: "so that the plant gets more sunlight" },
        { correct: false, label: "so that the black roots can dry out" },
      ],
    },
  },
};

export default item;
