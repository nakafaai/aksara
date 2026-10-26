import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$ tahun",
        },
        {
          correct: false,
          label: "$$17$$ tahun",
        },
        {
          correct: true,
          label: "$$18$$ tahun",
        },
        {
          correct: false,
          label: "$$20$$ tahun",
        },
        {
          correct: false,
          label: "$$22$$ tahun",
        },
      ],
    },
  },
};

export default item;
