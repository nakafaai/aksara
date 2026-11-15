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
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The clinic had the same number of appointments in 2023 as in 2024.",
        },
        {
          correct: false,
          label:
            "The number of missed appointments fell by more than $$20\\%$$ from 2023 to 2024.",
        },
        {
          correct: true,
          label:
            "In both years, patients who did not sign up missed appointments at more than twice the rate of patients who did.",
        },
        {
          correct: true,
          label:
            "Patients who signed up accounted for about a third of all appointments in 2024.",
        },
        {
          correct: false,
          label:
            "The share of appointments missed by patients who signed up fell by a quarter from 2023 to 2024.",
        },
      ],
    },
  },
};

export default item;
