import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
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
            "How fast an animal solves a problem tells us nothing at all about whether it planned.",
        },
        {
          column: 1,
          label:
            "Knowing why a behaviour pays off is different from knowing what an animal foresees.",
        },
        {
          column: 1,
          label:
            "A quick success on a first attempt can come from rules a bird has already learned rather than from foresight.",
        },
        {
          column: 2,
          label:
            "Once bending is known to be natural for the species, Betty's result tells us nothing about her abilities.",
        },
        {
          column: 1,
          label:
            "A result from a captive bird can be misjudged if researchers do not know what the species does in the wild.",
        },
      ],
    },
  },
};

export default item;
