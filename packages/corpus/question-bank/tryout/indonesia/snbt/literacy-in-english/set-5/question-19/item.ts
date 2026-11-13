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
            "The grandfather had begun to forget how to protect the orchard.",
        },
        {
          column: 1,
          label:
            "The ending suggests that the grandfather expected the narrator might one day have to protect the orchard without him.",
        },
        {
          column: 2,
          label:
            "The narrator blames the Hallers for not watering their trees.",
        },
      ],
    },
  },
};

export default item;
