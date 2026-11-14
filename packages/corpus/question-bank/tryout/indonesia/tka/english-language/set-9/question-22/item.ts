import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "first-aid",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Using a trial course and a story from a school trip, the writer argues for first-aid training for every Grade 10 student and answers parents' worries by keeping the steps simple and safe.",
        },
        {
          correct: false,
          label:
            "A student cuts her hand at a waterfall, and her friends take her to hospital.",
        },
        {
          correct: false,
          label:
            "The youth health club looks for new members by offering free quizzes.",
        },
        {
          correct: false,
          label:
            "Parents ask the school to stop all trips until every teacher has learned first aid.",
        },
        {
          correct: false,
          label:
            "A quiz proves that trained students will always act correctly in a real emergency.",
        },
      ],
    },
  },
};

export default item;
