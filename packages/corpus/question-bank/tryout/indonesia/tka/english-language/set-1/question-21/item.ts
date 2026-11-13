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
            "Practice matters, but grading home work rewards home conditions, and the records suggest that late weekend work does not mean lower learning.",
        },
        {
          correct: false,
          label:
            "Practice matters, and the records show that students who hand in weekend work late learn less by the end of the unit.",
        },
        {
          correct: false,
          label:
            "Grading home work rewards home conditions, so students should stop practising at weekends.",
        },
        {
          correct: false,
          label:
            "Practice matters, and the records show that weekend work is late more often because students care less at weekends.",
        },
        {
          correct: false,
          label:
            "Grading home work is unfair, and the records show that weekday deadlines lead to better test scores.",
        },
      ],
    },
  },
};

export default item;
