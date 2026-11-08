import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "shipping-container",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Before containers, a cargo ship could spend as much time in port as at sea.",
        },
        {
          column: 2,
          label: "The *Ideal X* carried its containers from Houston to Newark.",
        },
        {
          column: 1,
          label:
            "Some old harbours in city centres declined partly because they had no room to expand.",
        },
        {
          column: 2,
          label:
            "Containerisation increased the number of dock jobs in port cities.",
        },
      ],
    },
  },
};

export default item;
