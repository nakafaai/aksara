import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Keep the existing wording and ask the child to memorise it more carefully.",
        },
        {
          isCorrect: true,
          label:
            "Clarify how the meeting places are described, then practise that part again.",
        },
        {
          isCorrect: false,
          label:
            "Wait for a real emergency to determine which meeting-place description was confusing.",
        },
        {
          isCorrect: false,
          label:
            "Remove the second meeting place because the contact information was remembered correctly.",
        },
        {
          isCorrect: false,
          label:
            "Ask the out-of-area contact to choose both places without reviewing household needs.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
