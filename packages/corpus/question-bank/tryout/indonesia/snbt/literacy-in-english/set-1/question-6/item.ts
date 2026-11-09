import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "parking-minimums",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To explain how planners calculate the number of parking spaces a building needs",
        },
        {
          correct: false,
          label:
            "To argue that cities should ban the construction of new parking garages",
        },
        {
          correct: false,
          label:
            "To describe the traffic problems caused by drivers searching for parking",
        },
        {
          correct: false,
          label:
            "To compare the travel habits of people in suburbs and in city centres",
        },
        {
          correct: true,
          label:
            "To argue that most parking requirements should go, letting parking follow local demand",
        },
      ],
    },
  },
};

export default item;
