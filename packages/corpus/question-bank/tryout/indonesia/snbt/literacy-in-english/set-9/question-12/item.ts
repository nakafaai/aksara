import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Every month with an average panel temperature above $$25$$ °C had a lower efficiency than March.",
        },
        {
          column: 2,
          label:
            "In July the panels turned a larger share of the arriving sunlight into electricity than in June.",
        },
        {
          column: 1,
          label:
            "From March to April the sunlight reaching the panels rose by more than a quarter while their efficiency stayed the same.",
        },
        {
          column: 2,
          label:
            "The table shows that heat alone caused the panels' lower efficiency in July.",
        },
        {
          column: 2,
          label:
            "The months with the most electricity produced were also the months with the highest efficiency.",
        },
      ],
    },
  },
};

export default item;
