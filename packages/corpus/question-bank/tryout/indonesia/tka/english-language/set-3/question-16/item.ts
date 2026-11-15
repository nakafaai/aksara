import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "compost-heap",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1$$ more bucketful of browns, and none of the scraps",
        },
        {
          correct: false,
          label: "$$3$$ more bucketfuls of browns, and none of the scraps",
        },
        {
          correct: false,
          label: "$$9$$ more bucketfuls of browns, and none of the scraps",
        },
        {
          correct: false,
          label: "$$3$$ bucketfuls of the scraps",
        },
        {
          correct: false,
          label: "$$3$$ kilograms of the scraps",
        },
      ],
    },
  },
};

export default item;
