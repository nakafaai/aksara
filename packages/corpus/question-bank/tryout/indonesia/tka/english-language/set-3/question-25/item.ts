import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "dim-lights",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "On the dimmed streets, complaints in 2025 were more than seven times those in 2024.",
        },
        {
          column: 2,
          label:
            "In 2025, night-time road crashes fell on both groups of streets.",
        },
        {
          column: 1,
          label:
            "Dimming would cut the city's yearly streetlight electricity bill by about a twelfth.",
        },
        {
          column: 2,
          label:
            "The dimmed streets had fewer night-time burglaries than the bright streets in both years.",
        },
        {
          column: 1,
          label:
            "Burglaries fell by more on the dimmed streets than on the bright streets.",
        },
      ],
    },
  },
};

export default item;
