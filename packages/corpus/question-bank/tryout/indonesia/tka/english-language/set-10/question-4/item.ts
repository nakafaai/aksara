import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "hill-observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The main telescope is used only in the daytime.",
        },
        {
          correct: false,
          label: "The main telescope is red, while the smaller ones are white.",
        },
        {
          correct: false,
          label: "The smaller telescopes stand on the concrete pillar.",
        },
        {
          correct: false,
          label: "The smaller telescopes stay in the classroom all night.",
        },
        {
          correct: true,
          label:
            "The main telescope stays on a pillar upstairs, while the smaller ones are set up on the lawn for visitors.",
        },
      ],
    },
  },
};

export default item;
