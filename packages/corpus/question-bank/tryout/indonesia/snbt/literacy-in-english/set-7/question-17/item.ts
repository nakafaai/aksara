import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "carnegie-libraries",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Carnegie's money paid for more than 2,500 library buildings.",
        },
        {
          column: 1,
          label:
            "Some former Carnegie libraries are now used as museums or offices.",
        },
        {
          column: 2,
          label: "Most Carnegie libraries were built in Britain.",
        },
        {
          column: 2,
          label: "Every town that was offered a grant accepted it.",
        },
      ],
    },
  },
};

export default item;
