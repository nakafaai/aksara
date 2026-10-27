import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$a+b=29$$",
        },
        {
          correct: true,
          label: "$$|a-b|=21$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{a+b}=7$$",
        },
        {
          correct: true,
          label: "$$(a-b)^2=441$$",
        },
        {
          correct: true,
          label: "$$\\frac1{\\sqrt a}+\\frac1{\\sqrt b}=\\frac7{10}$$",
        },
      ],
    },
  },
};

export default item;
