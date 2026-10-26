import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\frac{17}{14}$$, $$123\\%$$, $$1{,}45$$, $$\\frac{5}{3}$$, $$\\sqrt{12}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{17}{14}$$, $$123\\%$$, $$1{,}45$$, $$\\sqrt{12}$$, $$\\frac{5}{3}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{5}{3}$$, $$\\frac{17}{14}$$, $$123\\%$$, $$1{,}45$$, $$\\sqrt{12}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{5}{3}$$, $$123\\%$$, $$1{,}45$$, $$\\sqrt{12}$$, $$\\frac{17}{14}$$",
        },
        {
          correct: false,
          label:
            "$$123\\%$$, $$\\frac{5}{3}$$, $$1{,}45$$, $$\\sqrt{12}$$, $$\\frac{17}{14}$$",
        },
      ],
    },
  },
};

export default item;
