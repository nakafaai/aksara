import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "umbrella",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bu Sari will take it back to her cart, since she was the first to find it.",
        },
        {
          correct: false,
          label:
            "Raka will come back to the shelter to pay its owner for the bent rib.",
        },
        {
          correct: false,
          label:
            "It will stay on the hook until the owner who lost it comes to collect it.",
        },
        {
          correct: false,
          label:
            "Wulan will take it home again, since her own umbrella is broken.",
        },
        {
          correct: true,
          label:
            "The next person caught at the shelter without cover in the rain will take it and later pass it on.",
        },
      ],
    },
  },
};

export default item;
