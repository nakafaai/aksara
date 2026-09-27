import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pertemuan berlangsung di Istana Negara",
        },
        {
          isCorrect: true,
          label:
            "Pemerintah meminta masukan yang konkret dan dapat segera dilaksanakan dari perwakilan dunia usaha",
        },
        {
          isCorrect: false,
          label:
            "Defisit transaksi berjalan lebih dari tiga kali defisit neraca perdagangan",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa perang dagang secara permanen menyebabkan defisit perdagangan",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan dunia usaha dapat menghadapi tantangan mendatang tanpa pemerintah",
        },
      ],
    },
  },
};

export default item;
