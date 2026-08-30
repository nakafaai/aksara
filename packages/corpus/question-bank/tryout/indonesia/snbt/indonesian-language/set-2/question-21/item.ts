import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Ratusan sisa kerangka manusia tersebar di sekitar danau",
        },
        {
          isCorrect: false,
          label: "Danau tersebut dahulu menjadi lokasi peperangan",
        },
        {
          isCorrect: false,
          label: "Semua jasad terbukti meninggal akibat badai es",
        },
        {
          isCorrect: false,
          label: "Danau tersebut pernah menjadi permukiman kuno",
        },
        {
          isCorrect: false,
          label: "Satu kelompok peziarah menamai danau tersebut",
        },
      ],
    },
  },
};

export default item;
