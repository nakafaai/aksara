import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "classroom-points",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that young children draw better when they use markers",
        },
        {
          correct: false,
          label:
            "To prove that certificates are the most effective classroom reward",
        },
        {
          correct: false,
          label:
            "To argue that preschools should stop giving children free play",
        },
        {
          correct: false,
          label:
            "To suggest that children may dislike drawing more than reading",
        },
        {
          correct: true,
          label:
            "To show how a reward can reduce interest once it is taken away",
        },
      ],
    },
  },
};

export default item;
