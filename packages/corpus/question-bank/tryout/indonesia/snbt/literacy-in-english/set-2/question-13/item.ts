import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "clinic-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The signed-up patients were already more reliable in 2023, and the clinic had the same number of appointments in both years.",
        },
        {
          correct: false,
          label:
            "The group without reminders improved by as much as the group with them, and the signed-up group made up only a third of appointments.",
        },
        {
          correct: true,
          label:
            "The signed-up patients were already more reliable in 2023, and the group without reminders improved by as much as the group with them.",
        },
        {
          correct: false,
          label:
            "The clinic's overall missed rate fell by only one point, and the signed-up patients missed a smaller share than the others.",
        },
        {
          correct: false,
          label:
            "The signed-up patients were less reliable in 2023, and the reminders were sent only the day before each appointment.",
        },
      ],
    },
  },
};

export default item;
