import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "tool-library",
  versions: {
    en: {
      columns: ["Supported", "Contradicted", "Not stated"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The library has lent tools more than seventy times as often as the number of tools it opened with.",
        },
        {
          column: 2,
          label:
            "A family membership lets four people in one household each have a tool out at the same time.",
        },
        {
          column: 3,
          label:
            "Most of the members surveyed later bought the tool they had put off buying.",
        },
        {
          column: 1,
          label:
            "Most of the tools that come back needing repair are fixed at the library.",
        },
        {
          column: 2,
          label:
            "A member who keeps a tool past its due date always pays a late fee.",
        },
        {
          column: 3,
          label: "Red-band tools cost more to replace than yellow-band tools.",
        },
      ],
    },
  },
};

export default item;
