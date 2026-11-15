import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "cholera-pump",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A school beside the pump whose pupils drank only water carried from a distant spring had almost no cases.",
        },
        {
          correct: false,
          label: "A street far from the pump had almost no cases.",
        },
        {
          correct: false,
          label:
            "A family living beside the pump, who drank its water every day, all fell ill.",
        },
        {
          correct: false,
          label: "A district south of the river had many more cases than Soho.",
        },
        {
          correct: false,
          label:
            "A doctor who lived near the pump and treated many patients caught cholera himself.",
        },
      ],
    },
  },
};

export default item;
