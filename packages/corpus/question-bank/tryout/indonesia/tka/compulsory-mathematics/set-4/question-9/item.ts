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
          label: "Persamaan $$f(f(x))=0$$ mempunyai tepat $$3$$ penyelesaian.",
        },
        {
          correct: true,
          label: "Persamaan $$f(x)=1$$ mempunyai tepat $$4$$ penyelesaian.",
        },
        {
          correct: true,
          label: "Nilai $$f(f(f(-3)))$$ adalah $$0$$.",
        },
        {
          correct: true,
          label:
            "Terdapat tepat dua bilangan real $$c$$ sehingga persamaan $$f(x)=c$$ mempunyai tepat $$3$$ penyelesaian.",
        },
        {
          correct: true,
          label:
            "Penyelesaian terbesar persamaan $$f(f(x))=0$$ adalah $$x=4$$.",
        },
      ],
    },
  },
};

export default item;
