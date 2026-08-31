import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Seluruh individu meninggal dalam badai yang sama",
        },
        {
          isCorrect: false,
          label: "Kelompok Mediterania timur merupakan kelompok tertua",
        },
        {
          isCorrect: false,
          label: "Semua individu Asia Selatan meninggal pada hari yang sama",
        },
        {
          isCorrect: true,
          label:
            "Jasad-jasad tersebut tidak berasal dari satu peristiwa kematian",
        },
        {
          isCorrect: false,
          label: "Penanggalan radiokarbon membuktikan penyebab kematian",
        },
      ],
    },
  },
};

export default item;
