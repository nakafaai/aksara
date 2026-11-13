import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Two lights of different wavelengths that set off exactly the same receptor types would look alike to the shrimp.",
        },
        {
          column: 2,
          label: "A brighter light within one receptor's band would be recognised as a different colour from a dimmer light in that band.",
        },
        {
          column: 1,
          label: "The comparison fits the shrimp's failure to separate two colours that both fall inside the band of a single receptor type.",
        },
        {
          column: 2,
          label: "The comparison suggests that each receptor type reacts to movement across the narrow strip of the eye.",
        },
        {
          column: 1,
          label: "On this view, part of the shrimp's speed comes from not having to weigh one signal against another.",
        },
      ],
    },
  },
};

export default item;
