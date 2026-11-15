import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "clinic-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "About $$17\\%$$, roughly half of their share of about a third of all appointments.",
        },
        {
          correct: false,
          label:
            "About $$4\\%$$, much less than their share of about a third of all appointments.",
        },
        {
          correct: false,
          label:
            "About $$33\\%$$, the same as their share of about a third of all appointments.",
        },
        {
          correct: false,
          label:
            "About $$17\\%$$, about the same as their share of all appointments.",
        },
        {
          correct: false,
          label:
            "About $$20\\%$$, a little more than half of their share of about a third of all appointments.",
        },
      ],
    },
  },
};

export default item;
