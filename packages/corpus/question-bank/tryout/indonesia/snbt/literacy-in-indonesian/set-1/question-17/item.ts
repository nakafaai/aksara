import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kesehatan mental dan keadaan ekonomi ibunya membuat pengasuhannya tidak stabil",
        },
        {
          correct: false,
          label: "Norma Jeane menolak tinggal bersama ibunya",
        },
        {
          correct: false,
          label: "Orang tuanya sengaja memutus seluruh hubungan dengannya",
        },
        {
          correct: false,
          label: "Norma Jeane sudah tidak mempunyai keluarga yang masih hidup",
        },
        {
          correct: false,
          label: "Ia ditempatkan di panti karena ingin segera menjadi aktris",
        },
      ],
    },
  },
};

export default item;
