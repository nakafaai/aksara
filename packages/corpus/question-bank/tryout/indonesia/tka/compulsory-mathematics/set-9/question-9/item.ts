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
          label: "$$f(2{,}5)=f(3)$$",
        },
        {
          correct: false,
          label:
            "$$f$$ selalu naik, yaitu $$f(a)<f(b)$$ untuk setiap $$0<a<b\\le24$$.",
        },
        {
          correct: false,
          label: "Ada nilai $$t$$ yang memenuhi $$f(t)=18{.}000$$.",
        },
        {
          correct: true,
          label: "$$f(t)=20{.}000$$ untuk setiap $$6\\le t\\le24$$.",
        },
        {
          correct: false,
          label: "$$f(2t)=2f(t)$$ untuk setiap $$0<t\\le12$$.",
        },
      ],
    },
  },
};

export default item;
