import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "alternative-explanation",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "After the move, many members of the same team sat farther apart than they had in their cubicles, some of them on different floors.",
        },
        {
          correct: false,
          label:
            "After the move, the employees who wore headphones most often were also the ones who had the fewest face-to-face conversations each day.",
        },
        {
          correct: false,
          label:
            "After the move, the rise in email was largest between colleagues whose desks were closest together on the open floor.",
        },
        {
          correct: false,
          label:
            "After the move, a share of the conversations that disappeared turned out to have been about matters unrelated to work.",
        },
        {
          correct: false,
          label:
            "After the move, face-to-face interaction fell by a similar amount at each of the two companies that were studied.",
        },
      ],
    },
  },
};

export default item;
