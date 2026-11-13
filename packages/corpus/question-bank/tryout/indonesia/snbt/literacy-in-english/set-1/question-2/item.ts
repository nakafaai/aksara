import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It detects movement whenever prey crosses in front of the shrimp's eye.",
        },
        {
          correct: false,
          label:
            "It is so sensitive that the shrimp often reacts to colours that are not there.",
        },
        {
          correct: true,
          label:
            "It signals only whether light in its own band has arrived, and that signal is not weighed against the others.",
        },
        {
          correct: false,
          label:
            "It must be set off in a fixed order, so a colour is recognised only once the eye has finished scanning.",
        },
        {
          correct: false,
          label:
            "It works like a human cone but responds to a narrower band of wavelengths.",
        },
      ],
    },
  },
};

export default item;
