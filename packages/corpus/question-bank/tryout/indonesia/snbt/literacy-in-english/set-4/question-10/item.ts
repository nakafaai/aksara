import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "school-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "That the gain in sleep may be smaller than $$34$$ minutes, because the high schools would start only half an hour later.",
        },
        {
          correct: false,
          label:
            "That the gain in sleep may be smaller than $$34$$ minutes, because high-school students would still have to catch their bus at the old time.",
        },
        {
          correct: false,
          label:
            "That the middle schools would have to start at 9:30, which many working parents cannot manage.",
        },
        {
          correct: false,
          label:
            "That moving to 8:30 would delay the high schools by almost an hour, more than the students need.",
        },
        {
          correct: false,
          label: "That extra buses would cost $$2.4$$ million dollars a year.",
        },
      ],
    },
  },
};

export default item;
