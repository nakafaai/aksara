import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Ratusan sisa kerangka manusia tersebar di sekitar danau",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Danau tersebut dahulu menjadi lokasi peperangan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua jasad terbukti meninggal akibat badai es",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Danau tersebut pernah menjadi permukiman kuno",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Satu kelompok peziarah menamai danau tersebut",
            },
          ],
        },
      ],
    },
  },
};

export default item;
