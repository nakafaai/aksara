import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "ocean-acidification",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Seagrass is more common near the vents because the acidic water has removed the animals that would otherwise eat it.",
        },
        {
          column: 1,
          label:
            "Oyster larvae are likely to be more vulnerable to the loss of carbonate than adult oysters are.",
        },
        {
          column: 1,
          label:
            "A population living near a vent may look less harmed than one that spent its whole life cycle in equally acidic water.",
        },
        {
          column: 2,
          label:
            "Species that grew faster in some tank experiments can be expected to benefit from acidification in the open sea.",
        },
      ],
    },
  },
};

export default item;
