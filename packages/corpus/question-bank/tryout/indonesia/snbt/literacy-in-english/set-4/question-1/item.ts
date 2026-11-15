import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "clever-hans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A questioner who knows the answer stands hidden from Hans, and a questioner who does not know it stands in full view.",
        },
        {
          correct: false,
          label:
            "A questioner who knows the answer stands in full view, and then asks harder sums from the same place.",
        },
        {
          correct: false,
          label:
            "A questioner who does not know the answer stands in full view, and then stands hidden from Hans.",
        },
        {
          correct: false,
          label:
            "Von Osten asks the questions in full view, and then a stranger who knows the answer asks them from the same place.",
        },
        {
          correct: false,
          label:
            "A questioner who knows the answer stands in full view, and then Hans is tested by the same questioner on another day.",
        },
      ],
    },
  },
};

export default item;
