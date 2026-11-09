import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "stilt-house",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The roof is covered with palm fiber." },
        {
          correct: true,
          label:
            "The house stands on posts, so the water flows under the floor.",
        },
        { correct: false, label: "The walls are made of woven bamboo panels." },
        { correct: false, label: "The ladder to the veranda has seven steps." },
        { correct: false, label: "The house is built from ironwood." },
      ],
    },
  },
};

export default item;
