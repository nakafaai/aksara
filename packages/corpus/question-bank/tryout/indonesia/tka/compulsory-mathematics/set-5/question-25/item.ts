import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}02$$",
        },
        {
          correct: true,
          label: "$$0{,}26$$",
        },
        {
          correct: false,
          label: "$$0{,}28$$",
        },
        {
          correct: false,
          label: "$$0{,}30$$",
        },
        {
          correct: false,
          label: "$$0{,}72$$",
        },
      ],
    },
  },
};

export default item;
