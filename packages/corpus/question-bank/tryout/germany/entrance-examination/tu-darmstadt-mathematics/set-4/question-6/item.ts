import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$a=2$$",
        },
        {
          correct: false,
          label: "für alle $$a$$ mit $$-2<a<2$$",
        },
        {
          correct: false,
          label: "$$a=-1$$ und $$a=1$$",
        },
        {
          correct: true,
          label: "$$a=-2$$ und $$a=2$$",
        },
        {
          correct: false,
          label: "für keinen Wert von $$a$$",
        },
        {
          correct: false,
          label: "für alle $$a$$ mit $$a<-2$$ oder $$a>2$$",
        },
      ],
    },
  },
};

export default item;
