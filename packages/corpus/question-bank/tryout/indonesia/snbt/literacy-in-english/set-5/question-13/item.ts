import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Eastport's figures show that a district can reach the $$95\\%$$ aim overall and still have an outbreak in one community.",
        },
        {
          column: 2,
          label:
            "Eastport's $$38$$ cases show that two doses of the vaccine often fail to protect children.",
        },
        {
          column: 1,
          label:
            "Eastport's coverage figure for the whole district could not, on its own, have warned the health office about the school.",
        },
        {
          column: 2,
          label:
            "If the private school's families had all been vaccinated, Eastport's coverage would have risen well above $$95\\%$$.",
        },
        {
          column: 2,
          label:
            "Eastport's unvaccinated children were spread fairly evenly across the district.",
        },
      ],
    },
  },
};

export default item;
