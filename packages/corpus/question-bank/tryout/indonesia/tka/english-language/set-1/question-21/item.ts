import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Practice matters, but a grade on work done at home measures home conditions, and the school's records show that weekend lateness says little about learning.",
        },
        {
          correct: false,
          label:
            "Practice matters, and a mathematics teacher warns that skills used only once a week fade between lessons.",
        },
        {
          correct: false,
          label:
            "Weekend work is often late, which shows that students who hand it in late learn less than the others.",
        },
        {
          correct: false,
          label:
            "Grades measure learning fairly, as long as students are given the whole weekend to finish their work.",
        },
        {
          correct: false,
          label:
            "Students who share a phone or work on Saturdays should be excused from all homework.",
        },
      ],
    },
  },
};

export default item;
