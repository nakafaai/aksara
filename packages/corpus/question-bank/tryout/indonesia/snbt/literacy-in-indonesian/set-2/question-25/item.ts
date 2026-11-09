import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Seluruh individu meninggal dalam badai yang sama",
        },
        {
          correct: false,
          label: "Kelompok Mediterania timur merupakan kelompok tertua",
        },
        {
          correct: false,
          label: "Semua individu Asia Selatan meninggal pada hari yang sama",
        },
        {
          correct: true,
          label:
            "Jasad-jasad tersebut tidak berasal dari satu peristiwa kematian",
        },
        {
          correct: false,
          label: "Penanggalan radiokarbon membuktikan penyebab kematian",
        },
      ],
    },
  },
};

export default item;
