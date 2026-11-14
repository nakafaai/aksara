import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Untuk $$a=1$$, $$\\lim_{x\\to2}f(x)$$ ada.",
        },
        {
          correct: true,
          label: "Untuk $$a=1$$, fungsi $$f$$ kontinu di $$x=2$$.",
        },
        {
          correct: false,
          label: "Untuk $$a=0$$, $$\\lim_{x\\to2^-}f(x)=4$$.",
        },
        {
          correct: true,
          label: "Untuk $$a=0$$, $$\\lim_{x\\to2}f(x)$$ tidak ada.",
        },
        {
          correct: false,
          label:
            "Ada tepat dua nilai $$a$$ yang membuat $$\\lim_{x\\to2}f(x)$$ ada.",
        },
      ],
    },
  },
};

export default item;
