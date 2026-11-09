import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "placebo-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hiding the real symptoms of a disease from patients so that they stay calm",
        },
        {
          correct: false,
          label:
            "Teaching patients to imagine pleasant images whenever they feel any pain",
        },
        {
          correct: false,
          label:
            "Giving patients a drug that slowly changes the way their brain works",
        },
        {
          correct: false,
          label:
            "Writing down every symptom so that doctors can study it later on",
        },
        {
          correct: true,
          label:
            "Making patients expect side effects so strongly that they begin to feel them",
        },
      ],
    },
  },
};

export default item;
