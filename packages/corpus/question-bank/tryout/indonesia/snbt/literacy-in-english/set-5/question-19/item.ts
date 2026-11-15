import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The list in the coat pocket was most likely meant for someone other than the grandfather himself.",
        },
        {
          column: 2,
          label:
            "The narrator found the list in the coat pocket on the night of the frost.",
        },
        {
          column: 1,
          label:
            "The ending suggests that the grandfather expected the narrator might one day have to protect the orchard without him.",
        },
        {
          column: 2,
          label:
            "The list shows that the grandfather no longer trusted his own memory of the steps.",
        },
        {
          column: 2,
          label:
            "The list repeats the thermometer readings that the grandfather wrote on his hand that night.",
        },
      ],
    },
  },
};

export default item;
