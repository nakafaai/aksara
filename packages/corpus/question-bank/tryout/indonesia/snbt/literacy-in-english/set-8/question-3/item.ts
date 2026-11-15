import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "phineas-gage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That he could keep to a fixed timetable and manage horses, which shows that Harlow's description was wrong even for the first months.",
        },
        {
          correct: true,
          label:
            "That he could keep to a fixed timetable and manage a team of horses, the kind of planning Harlow reported he could no longer do.",
        },
        {
          correct: false,
          label:
            "That he had recovered from every effect of the injury, so Harlow's report must have been false.",
        },
        {
          correct: false,
          label:
            "That his friends had been wrong all along to say that he was no longer the man he had been.",
        },
        {
          correct: false,
          label:
            "That he could keep to a fixed timetable, which proves that the front of the brain has nothing to do with planning.",
        },
      ],
    },
  },
};

export default item;
