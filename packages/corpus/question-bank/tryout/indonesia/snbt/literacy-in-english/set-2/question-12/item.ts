import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "clinic-reminders",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Among patients who did not sign up, the missed rate fell by as many percentage points as among patients who signed up.",
        },
        {
          column: 2,
          label:
            "In 2024, patients who signed up missed a larger share of their appointments than the clinic's patients as a whole had missed in 2023.",
        },
        {
          column: 1,
          label:
            "In 2024, patients who did not sign up accounted for five of every six missed appointments.",
        },
        {
          column: 2,
          label:
            "The figures show that the reminders lowered the missed rate of the patients who signed up.",
        },
        {
          column: 2,
          label:
            "Had the reminders had no effect, the signed-up group's missed rate would most likely have stayed at $$5\\%$$ in 2024.",
        },
      ],
    },
  },
};

export default item;
