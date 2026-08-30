import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The village no longer reads books.",
        },
        {
          isCorrect: false,
          label: "The crew wants a stronger internet signal.",
        },
        {
          isCorrect: false,
          label: "The folding ramp is stored in that village.",
        },
        {
          isCorrect: false,
          label: "The boat's blue roof becomes too hot.",
        },
        {
          isCorrect: true,
          label: "The usual river access changes when the water level falls.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
