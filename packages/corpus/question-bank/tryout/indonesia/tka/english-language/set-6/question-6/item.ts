import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "beach-cleanup",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Each group received two sacks." },
        {
          column: 2,
          label:
            "Bottles were the most common item found by the writer's group.",
        },
        { column: 1, label: "The volunteers met before seven o'clock." },
        { column: 2, label: "The data was sent to the town's tourism office." },
      ],
    },
  },
};

export default item;
