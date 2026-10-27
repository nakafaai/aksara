import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60 \\text{ tahun}$$",
        },
        {
          correct: true,
          label: "$$57 \\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$56 \\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$54 \\text{ tahun}$$",
        },
        {
          correct: false,
          label: "$$52 \\text{ tahun}$$",
        },
      ],
    },
  },
};

export default item;
