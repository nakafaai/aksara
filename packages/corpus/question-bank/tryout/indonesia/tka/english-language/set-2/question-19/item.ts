import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "emergency-plan",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keep the existing wording and ask the child to memorise it more carefully.",
        },
        {
          correct: true,
          label:
            "Clarify how the meeting places are described, then practise that part again.",
        },
        {
          correct: false,
          label:
            "Wait for a real emergency to determine which meeting-place description was confusing.",
        },
        {
          correct: false,
          label:
            "Remove the second meeting place because the contact information was remembered correctly.",
        },
        {
          correct: false,
          label:
            "Ask the out-of-area contact to choose both places without reviewing household needs.",
        },
      ],
    },
  },
};

export default item;
