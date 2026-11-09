import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "phone-free-lunch",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to explain how the student council carried out a survey",
        },
        {
          correct: false,
          label: "to describe what students usually eat in the canteen",
        },
        {
          correct: false,
          label:
            "to argue that phones should be banned for the whole school day",
        },
        {
          correct: false,
          label:
            "to report that phones are the main cause of students' tiredness",
        },
        {
          correct: true,
          label:
            "to persuade the school to ask students to keep their phones away during lunch",
        },
      ],
    },
  },
};

export default item;
