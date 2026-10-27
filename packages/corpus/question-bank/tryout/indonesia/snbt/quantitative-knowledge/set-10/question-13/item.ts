import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1\\frac{1}{8},\\quad \\frac{3}{4},\\quad \\frac{1}{\\sqrt{2}},\\quad 12{,}5\\%,\\quad 0{,}875$$",
        },
        {
          correct: false,
          label:
            "$$1\\frac{1}{8},\\quad 0{,}875,\\quad 12{,}5\\%,\\quad \\frac{3}{4},\\quad \\frac{1}{\\sqrt{2}}$$",
        },
        {
          correct: false,
          label:
            "$$0{,}875,\\quad 1\\frac{1}{8},\\quad \\frac{3}{4},\\quad \\frac{1}{\\sqrt{2}},\\quad 12{,}5\\%$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{1}{\\sqrt{2}},\\quad 1\\frac{1}{8},\\quad 0{,}875,\\quad \\frac{3}{4},\\quad 12{,}5\\%$$",
        },
        {
          correct: true,
          label:
            "$$1\\frac{1}{8},\\quad 0{,}875,\\quad \\frac{3}{4},\\quad \\frac{1}{\\sqrt{2}},\\quad 12{,}5\\%$$",
        },
      ],
    },
  },
};

export default item;
