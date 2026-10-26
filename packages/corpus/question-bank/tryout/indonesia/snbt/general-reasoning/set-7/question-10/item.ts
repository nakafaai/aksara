import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$890\\text{ kunjungan}$$",
        },
        {
          correct: false,
          label: "$$760\\text{ kunjungan}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ kunjungan}$$",
        },
        {
          correct: false,
          label: "$$1060\\text{ kunjungan}$$",
        },
        {
          correct: false,
          label: "$$1160\\text{ kunjungan}$$",
        },
      ],
    },
  },
};

export default item;
