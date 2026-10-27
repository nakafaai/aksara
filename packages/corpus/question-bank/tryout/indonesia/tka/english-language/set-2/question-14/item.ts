import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "last-bus",
  versions: {
    en: {
      columns: ["Planned", "Live", "Direct"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The printed timetable",
        },
        {
          column: 2,
          label: "The official service page",
        },
        {
          column: 3,
          label: "The clinic receptionist",
        },
      ],
    },
  },
};

export default item;
