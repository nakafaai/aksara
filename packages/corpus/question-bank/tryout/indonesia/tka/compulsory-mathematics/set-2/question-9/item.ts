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
          correct: false,
          label:
            "Nilai maksimum $$f$$ adalah $$6$$ dan hanya dicapai pada satu nilai $$x$$.",
        },
        {
          correct: true,
          label: "Persamaan $$f(x)=3$$ mempunyai tepat satu penyelesaian.",
        },
        {
          correct: false,
          label: "Persamaan $$f(x)=-6$$ mempunyai tepat dua penyelesaian.",
        },
        {
          correct: false,
          label: "$$f(x)<0$$ untuk setiap $$x>0$$.",
        },
        {
          correct: true,
          label:
            "Banyak bilangan bulat $$x$$ yang memenuhi $$-4\\le f(x)\\le4$$ adalah $$5$$.",
        },
      ],
    },
  },
};

export default item;
