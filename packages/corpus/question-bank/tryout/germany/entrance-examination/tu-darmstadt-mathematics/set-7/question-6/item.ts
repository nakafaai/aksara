import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$f(x)=x^2-2x+1$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2-3$$",
        },
        {
          correct: false,
          label: "$$f(x)=2x+5$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2+x-1$$",
        },
        {
          correct: true,
          label: "$$f(x)=x^2+2x+3$$",
        },
        {
          correct: false,
          label: "$$f(x)=-x^2+4$$",
        },
      ],
    },
  },
};

export default item;
