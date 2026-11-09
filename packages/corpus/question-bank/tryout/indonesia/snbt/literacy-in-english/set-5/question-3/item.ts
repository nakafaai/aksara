import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "placebo-effect",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Beecher concluded that about a third of patients felt better after a placebo.",
        },
        {
          column: 2,
          label:
            "The 2001 review found a large placebo effect on outcomes measured objectively.",
        },
        {
          column: 2,
          label:
            "The 2010 study measured improvement mainly with laboratory tests.",
        },
        {
          column: 1,
          label:
            "In the dental study, naloxone removed much of the pain relief from the placebo.",
        },
      ],
    },
  },
};

export default item;
