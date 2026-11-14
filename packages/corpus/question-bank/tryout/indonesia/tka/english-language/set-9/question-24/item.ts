import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "first-aid",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The average quiz score rose from 4.2 to 8.6.",
        },
        { correct: false, label: "The trial course took only two afternoons." },
        {
          correct: false,
          label: "Students are taught to call an adult or an ambulance first.",
        },
        {
          correct: false,
          label:
            "A trained student can help a younger brother who burns a finger.",
        },
        {
          correct: true,
          label:
            "On last year's trip, a student cut her hand while the teachers were at the front of the group.",
        },
      ],
    },
  },
};

export default item;
