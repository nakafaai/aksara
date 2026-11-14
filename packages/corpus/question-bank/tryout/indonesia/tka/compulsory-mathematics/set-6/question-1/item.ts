import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "phone-storage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$9{.}888$$",
        },
        {
          correct: false,
          label: "$$9{.}889$$",
        },
        {
          correct: false,
          label: "$$18{.}555$$",
        },
        {
          correct: false,
          label: "$$28{.}444$$",
        },
        {
          correct: false,
          label: "$$98{.}888$$",
        },
      ],
    },
  },
};

export default item;
