import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "liver-screening",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Of the $$585$$ positive results, $$495$$ were false alarms.",
        },
        {
          correct: true,
          label:
            "Overall, the test gave the right result for about $$95\\%$$ of the adults tested.",
        },
        {
          correct: false,
          label:
            "A positive result raised a person's chance of having the condition from $$1\\%$$ to about $$90\\%$$.",
        },
        {
          correct: true,
          label:
            "If the $$585$$ adults who tested positive took a second, independent test with the same error rates, more of those testing positive again would have the condition than not.",
        },
        {
          correct: false,
          label:
            "The $$10$$ adults with the condition who tested negative made up $$10\\%$$ of all negative results.",
        },
      ],
    },
  },
};

export default item;
