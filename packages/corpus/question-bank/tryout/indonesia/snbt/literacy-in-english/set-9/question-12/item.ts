import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "recycling-rate",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "More tonnes of mixed plastics were recycled than of plastic bottles.",
        },
        {
          column: 1,
          label:
            "Glass had the highest share of bin material that was actually recycled.",
        },
        {
          column: 1,
          label:
            "Paper and cardboard made up the largest amount put in recycling bins.",
        },
        {
          column: 2,
          label:
            "Everything put in the recycling bins was sent to recycling companies.",
        },
      ],
    },
  },
};

export default item;
