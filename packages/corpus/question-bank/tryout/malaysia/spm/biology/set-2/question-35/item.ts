import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Y after $$9$$ cycles, and X needs $$8$$ more",
        },
        {
          correct: false,
          label: "Y after $$10$$ cycles, and X needs $$128$$ more",
        },
        {
          correct: true,
          label: "Y after $$10$$ cycles, and X needs $$7$$ more",
        },
        {
          correct: false,
          label: "Y after $$10$$ cycles, and X needs $$1270$$ more",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Y selepas $$9$$ kitaran, dan X memerlukan $$8$$ lagi",
        },
        {
          correct: false,
          label: "Y selepas $$10$$ kitaran, dan X memerlukan $$128$$ lagi",
        },
        {
          correct: true,
          label: "Y selepas $$10$$ kitaran, dan X memerlukan $$7$$ lagi",
        },
        {
          correct: false,
          label: "Y selepas $$10$$ kitaran, dan X memerlukan $$1270$$ lagi",
        },
      ],
    },
  },
};

export default item;
