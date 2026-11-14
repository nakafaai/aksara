import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "wrong-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Nadia's mother writes the route on a card." },
        {
          correct: true,
          label:
            "Nadia realizes that she is on Bus 7B, far from the clock tower.",
        },
        {
          correct: false,
          label: "Nadia reaches the bakery forty minutes late.",
        },
        {
          correct: false,
          label: "Her aunt writes a note on the back of the card.",
        },
        {
          correct: false,
          label: "Nadia checks the bus sign twice at the market.",
        },
      ],
    },
  },
};

export default item;
