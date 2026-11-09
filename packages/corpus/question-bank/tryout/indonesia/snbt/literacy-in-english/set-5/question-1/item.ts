import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "placebo-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Placebo effects are smaller than once claimed, yet some of them are real and measurable.",
        },
        {
          correct: false,
          label:
            "Beecher's 1955 figure showed that a third of all illnesses exist only in patients' minds.",
        },
        {
          correct: false,
          label:
            "Placebos can only work when patients are deceived about what they are being given.",
        },
        {
          correct: false,
          label:
            "Drug trials should stop comparing new medicines with dummy treatments of any kind.",
        },
        {
          correct: false,
          label:
            "Naloxone is the most effective treatment for pain after dental surgery.",
        },
      ],
    },
  },
};

export default item;
