import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "app-reminders",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "On day 7, more than half of the reminder group were still using the app.",
        },
        {
          column: 2,
          label:
            "On day 90, the reminder group had twice as many active users as the other group.",
        },
        {
          column: 1,
          label:
            "Between day 30 and day 90, the no-reminder group lost more than half of its remaining users.",
        },
        {
          column: 1,
          label: "People were placed in the two groups at random.",
        },
      ],
    },
  },
};

export default item;
