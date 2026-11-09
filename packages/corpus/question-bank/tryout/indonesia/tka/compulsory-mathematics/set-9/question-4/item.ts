import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$ tahun",
        },
        {
          correct: false,
          label: "$$24$$ tahun",
        },
        {
          correct: false,
          label: "$$28$$ tahun",
        },
        {
          correct: true,
          label: "$$34$$ tahun",
        },
        {
          correct: false,
          label: "$$42$$ tahun",
        },
      ],
    },
  },
};

export default item;
