import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$f(x)=x^2+x+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=2x+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=4x+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2+2x+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=3x^2-x+1$$",
        },
      ],
    },
  },
};

export default item;
