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
            "Lateness rates tend to rise with trip length, but trip length alone does not explain why bus users are late more often than train users.",
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
