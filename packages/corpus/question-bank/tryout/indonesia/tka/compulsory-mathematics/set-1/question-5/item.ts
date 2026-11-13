import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Untuk $$k=10$$, banyak bilangan bulat $$x$$ yang memenuhi pertidaksamaan itu adalah $$7$$.",
        },
        {
          correct: true,
          label:
            "Pertidaksamaan itu mempunyai penyelesaian jika dan hanya jika $$k\\ge4$$.",
        },
        {
          correct: false,
          label:
            "Untuk $$k=10$$, himpunan penyelesaiannya simetris terhadap $$x=1$$.",
        },
        {
          correct: true,
          label:
            "Untuk $$k=4$$, tepat satu bilangan real $$x$$ memenuhi pertidaksamaan itu.",
        },
        {
          correct: false,
          label:
            "Untuk $$k=6$$, nilai $$x$$ terbesar yang memenuhi pertidaksamaan itu adalah $$\\frac{7}{3}$$.",
        },
      ],
    },
  },
};

export default item;
