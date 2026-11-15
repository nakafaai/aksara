import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$f(x)=x^2+2x-8$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2-14x+46$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2-2x-9$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2-2x+8$$",
        },
        {
          correct: false,
          label: "$$f(x)=x^2-4x-5$$",
        },
        {
          correct: true,
          label: "$$f(x)=x^2-2x-8$$",
        },
      ],
    },
  },
};

export default item;
