import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
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
  stimulus: "last-bus",
};

export default item;
