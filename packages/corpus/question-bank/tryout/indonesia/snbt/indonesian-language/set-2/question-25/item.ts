import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seluruh individu meninggal dalam badai yang sama",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jasad-jasad tersebut tidak berasal dari satu peristiwa kematian",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kelompok Mediterania timur merupakan kelompok tertua",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua individu Asia Selatan meninggal pada hari yang sama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penanggalan radiokarbon membuktikan penyebab kematian",
            },
          ],
        },
      ],
    },
  },
};

export default item;
