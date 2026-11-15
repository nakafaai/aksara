import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The school has felt calmer since the ban.",
        },
        {
          column: 2,
          label:
            "The ban raised the maths pass rate by nine percentage points.",
        },
        {
          column: 1,
          label: "Keeping phones out of lessons is a reasonable policy.",
        },
        {
          column: 2,
          label: "Bullying moved to the evening after the ban.",
        },
        {
          column: 2,
          label:
            "Other schools that ban phones should expect a similar rise in their pass rates.",
        },
      ],
    },
  },
};

export default item;
