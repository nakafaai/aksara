import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tahun ke-$$2$$",
        },
        {
          correct: false,
          label: "Tahun ke-$$3$$",
        },
        {
          correct: false,
          label: "Tahun ke-$$4$$",
        },
        {
          correct: true,
          label: "Tahun ke-$$1$$",
        },
        {
          correct: false,
          label: "Tahun ke-$$5$$",
        },
      ],
    },
  },
};

export default item;
