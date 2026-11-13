import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Part of the privacy that the partitions used to give is recreated by what employees do.",
        },
        {
          column: 2,
          label: "The employees rebuilt physical barriers on the open floor.",
        },
        {
          column: 1,
          label:
            "The rise in email and instant messaging fits the writer's claim.",
        },
        {
          column: 2,
          label:
            "The claim implies that the badges undercounted the employees' face-to-face talk.",
        },
        {
          column: 1,
          label:
            "On this view, a team whose members do not mind being overheard would lose less face-to-face talk after a move to an open plan.",
        },
      ],
    },
  },
};

export default item;
