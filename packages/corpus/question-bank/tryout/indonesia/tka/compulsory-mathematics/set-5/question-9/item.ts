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
          label:
            "Bilangan bulat positif terkecil $$x$$ yang memenuhi $$f(x)>g(x)$$ adalah $$7$$.",
        },
        {
          correct: true,
          label:
            "Untuk setiap bilangan bulat $$x\\ge7$$, berlaku $$f(x)>g(x)$$.",
        },
        {
          correct: false,
          label:
            "Banyak bilangan bulat $$x$$ yang memenuhi $$f(x)<g(x)$$ adalah $$6$$.",
        },
        {
          correct: false,
          label:
            "Untuk setiap bilangan bulat $$x\\ge3$$, berlaku $$f(x)\\ge h(x)$$.",
        },
        {
          correct: true,
          label: "Ada bilangan bulat $$x$$ yang memenuhi $$g(x)<h(x)<f(x)$$.",
        },
      ],
    },
  },
};

export default item;
