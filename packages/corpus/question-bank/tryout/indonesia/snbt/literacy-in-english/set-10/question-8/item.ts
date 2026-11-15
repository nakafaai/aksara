import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That her children see other children every day, at co-op classes, at soccer and at the library.",
        },
        {
          correct: false,
          label:
            "That the share of households reporting homeschooling rose from $$5.4\\%$$ to $$11.1\\%$$ in 2020.",
        },
        {
          correct: false,
          label:
            'That "study after study" finds homeschooled students scoring well above the national average.',
        },
        {
          correct: true,
          label:
            "That the burden of proof should fall on those who want to tighten the rules.",
        },
        {
          correct: false,
          label:
            "That no one knows her children's habits and gaps better than she does.",
        },
      ],
    },
  },
};

export default item;
