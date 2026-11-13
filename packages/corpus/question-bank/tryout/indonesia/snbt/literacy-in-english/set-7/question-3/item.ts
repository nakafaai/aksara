import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "crow-tools",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Most of the crows in the 2018 study built tools from $$3$$ or more pieces.",
        },
        {
          column: 1,
          label:
            "Half of the wild-caught crows in the 2018 study joined pieces into a tool long enough to reach the food.",
        },
        {
          column: 1,
          label:
            "Betty's 2002 result was read as invention partly because bending was believed to be new to her species.",
        },
        {
          column: 2,
          label:
            "The 2021 laboratory study found that the crows bent tools mainly through sudden insight rather than repeated attempts.",
        },
        {
          column: 1,
          label:
            "The researchers behind the 2018 study did not claim to know how the birds reasoned their way to a solution.",
        },
      ],
    },
  },
};

export default item;
