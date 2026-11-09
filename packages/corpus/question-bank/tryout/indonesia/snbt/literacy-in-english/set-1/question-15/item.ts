import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "campus-commute",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Longer average trips always lead to a higher lateness rate.",
        },
        {
          correct: false,
          label:
            "Students who travel by car or motorbike are late more often than students who take the train.",
        },
        {
          correct: true,
          label:
            "Lateness tends to rise with trip length, yet trip length alone cannot explain the bus-train gap.",
        },
        {
          correct: false,
          label: "Walking is the most common way of travelling to campus.",
        },
        {
          correct: false,
          label:
            "Students who cycle are late more often than students who travel by car or motorbike.",
        },
      ],
    },
  },
};

export default item;
