import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "campus-commute",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Walking",
        },
        {
          correct: false,
          label: "Bicycle",
        },
        {
          correct: false,
          label: "Public bus",
        },
        {
          correct: true,
          label: "Car or motorbike",
        },
        {
          correct: false,
          label: "None of the other groups",
        },
      ],
    },
  },
};

export default item;
