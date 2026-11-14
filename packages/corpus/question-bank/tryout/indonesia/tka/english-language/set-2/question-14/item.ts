import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  stimulus: "sprout",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Plants grown from packet A will be healthier than plants grown from packet B.",
        },
        {
          correct: false,
          label: "Packet A germinated at a higher rate than packet B.",
        },
        {
          correct: true,
          label:
            "Packet B lost its ability to sprout because the tool shed was damp.",
        },
        {
          correct: true,
          label:
            "Packet A's seeds would sprout at the same rate in a cold spring.",
        },
        {
          correct: false,
          label:
            "Under the club's rule, packet B should be replaced with new seed.",
        },
      ],
    },
  },
};

export default item;
