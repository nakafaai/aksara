import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$f(a)+f(b)=f(ab+2a+2b+2)$$ untuk setiap $$a>-2$$ dan $$b>-2$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}\\big(f(5)+1\\big)=19$$.",
        },
        {
          correct: true,
          label: "Persamaan $$f(x)=f\\left(\\frac{1}{x}\\right)$$ mempunyai tepat dua penyelesaian real.",
        },
        {
          correct: true,
          label: "$$f(x)+f(-x)\\le2f(0)$$ untuk setiap $$x$$ dengan $$-2<x<2$$.",
        },
        {
          correct: false,
          label: "Nilai $$f(2x)-f(x)$$ sama untuk setiap $$x>-1$$.",
        },
      ],
    },
  },
};

export default item;
