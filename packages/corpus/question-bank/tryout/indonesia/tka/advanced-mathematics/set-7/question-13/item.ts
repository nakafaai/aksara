import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\vec{u}+\\vec{v}$$ tegak lurus $$\\vec{u}-\\vec{v}$$.",
        },
        {
          correct: true,
          label: "$$|\\vec{u}+\\vec{v}|=|\\vec{u}-\\vec{v}|$$",
        },
        {
          correct: true,
          label: "$$|\\vec{u}+\\vec{v}|=3\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$\\vec{u}-\\vec{v}=\\vec{i}-\\vec{j}$$",
        },
        {
          correct: false,
          label:
            "Sudut antara $$\\vec{u}$$ dan $$\\vec{u}+\\vec{v}$$ adalah $$60^\\circ$$.",
        },
      ],
    },
  },
};

export default item;
