import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "screens-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Students who chose to take part may differ from those who did not.",
        },
        {
          correct: false,
          label:
            "Sixty students are too many for a school counsellor to follow closely.",
        },
        {
          correct: false,
          label:
            "Two weeks is too long for students to remember their usual bedtimes.",
        },
        {
          correct: false,
          label:
            "The volunteers' sleep fell instead of rising during the two weeks.",
        },
        {
          correct: false,
          label:
            "The volunteers were probably the heaviest screen users in the survey.",
        },
      ],
    },
  },
};

export default item;
