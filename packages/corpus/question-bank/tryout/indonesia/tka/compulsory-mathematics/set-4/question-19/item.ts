import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\,\\%$$",
        },
        {
          correct: false,
          label: "$$100\\,\\%$$",
        },
        {
          correct: false,
          label: "$$125\\,\\%$$",
        },
        {
          correct: false,
          label: "$$150\\,\\%$$",
        },
        {
          correct: true,
          label: "$$237{,}5\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
