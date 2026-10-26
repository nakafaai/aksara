import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pertemuan berlangsung di Istana Negara",
        },
        {
          correct: true,
          label:
            "Pemerintah meminta masukan yang konkret dan dapat segera dilaksanakan dari perwakilan dunia usaha",
        },
        {
          correct: false,
          label:
            "Defisit transaksi berjalan lebih dari tiga kali defisit neraca perdagangan",
        },
        {
          correct: false,
          label:
            "Bacaan membuktikan bahwa perang dagang secara permanen menyebabkan defisit perdagangan",
        },
        {
          correct: false,
          label:
            "Bacaan menyatakan dunia usaha dapat menghadapi tantangan mendatang tanpa pemerintah",
        },
      ],
    },
  },
};

export default item;
