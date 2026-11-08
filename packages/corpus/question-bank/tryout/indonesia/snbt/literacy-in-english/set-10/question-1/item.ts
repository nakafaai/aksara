import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "glacier-flow",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Glaciers keep moving, at speeds that vary by place and season.",
        },
        {
          correct: false,
          label: "Glaciers grow only in winter and shrink only in summer.",
        },
        {
          correct: false,
          label: "A retreating glacier flows backwards up its valley.",
        },
        {
          correct: false,
          label:
            "Greenland's glaciers are fastest because they are the thickest.",
        },
        {
          correct: false,
          label: "Scientists did not begin to study glaciers until the 1840s.",
        },
      ],
    },
  },
};

export default item;
