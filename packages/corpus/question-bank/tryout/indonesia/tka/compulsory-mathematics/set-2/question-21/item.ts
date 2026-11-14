import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "nilai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$17\\le x\\le40$$ atau $$98\\le x\\le100$$",
        },
        {
          correct: false,
          label: "$$18\\le x\\le41$$ atau $$97\\le x\\le100$$",
        },
        {
          correct: false,
          label: "$$0\\le x\\le40$$ atau $$98\\le x\\le100$$",
        },
        {
          correct: false,
          label: "$$30\\le x\\le47$$ atau $$91\\le x\\le100$$",
        },
        {
          correct: false,
          label: "Tidak ada nilai $$x$$ yang memenuhi.",
        },
      ],
    },
  },
};

export default item;
