import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "liver-screening",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The test misses $$10$$ of the $$100$$ people who have the condition, so a positive result cannot be trusted.",
        },
        {
          correct: false,
          label:
            "The maker's figure of $$95\\%$$ is false, because the test is right far less often than that overall.",
        },
        {
          correct: false,
          label:
            "Most adults who test negative still have the condition, so testing positive adds little.",
        },
        {
          correct: true,
          label:
            "The condition is rare, so even a small false-alarm rate among the many healthy adults produces more positives than the few adults with the condition do.",
        },
        {
          correct: false,
          label:
            "The test wrongly flags $$5$$ in every $$100$$ healthy adults, so only $$5\\%$$ of positive results are false.",
        },
      ],
    },
  },
};

export default item;
