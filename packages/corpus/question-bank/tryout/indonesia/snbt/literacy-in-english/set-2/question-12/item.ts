import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "During the pilot, every daytime time slot had fewer visitors than before the pilot.",
        },
        {
          column: 1,
          label:
            "During the pilot, the evening slot attracted more visitors than the 9 a.m. to 12 noon slot.",
        },
        {
          column: 2,
          label:
            "The average number of daytime visitors fell by more than 100 per weekday during the pilot.",
        },
        {
          column: 2,
          label:
            "The questionnaire was given to every visitor to the library during the pilot.",
        },
      ],
    },
  },
};

export default item;
