import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "milk-cans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$192$$ kaleng",
        },
        {
          correct: false,
          label: "$$96$$ kaleng",
        },
        {
          correct: false,
          label: "$$61$$ kaleng",
        },
        {
          correct: true,
          label: "$$48$$ kaleng",
        },
        {
          correct: false,
          label: "$$24$$ kaleng",
        },
      ],
    },
  },
};

export default item;
