import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Uwet berkebun di bawah pohon ceri",
        },
        {
          correct: false,
          label: "Uwet mencari siput",
        },
        {
          correct: true,
          label: "Uwet mencoba mengambil buah ceri",
        },
        {
          correct: false,
          label: "Uwet menangkap siput",
        },
        {
          correct: false,
          label: "Uwet menunggu kedatangan Enjin dan Ensi",
        },
      ],
    },
  },
};

export default item;
