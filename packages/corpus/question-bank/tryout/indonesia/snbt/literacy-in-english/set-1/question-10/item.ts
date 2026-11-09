import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "parking-minimums",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "If most buyers there want two spaces per home, developers should be free to build them.",
        },
        {
          correct: false,
          label:
            "The town should keep its parking minimums permanently, whatever buyers want.",
        },
        {
          correct: false,
          label:
            "The town should ban new parking in order to make residents use public transport.",
        },
        {
          correct: false,
          label:
            "The town should copy the parking rules of large cities that have removed their minimums.",
        },
        {
          correct: false,
          label:
            "The town should require developers to build no more than one space per home.",
        },
      ],
    },
  },
};

export default item;
