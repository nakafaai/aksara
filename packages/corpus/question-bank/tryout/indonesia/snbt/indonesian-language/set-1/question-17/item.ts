import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Norma Jeane menolak tinggal bersama ibunya",
        },
        {
          isCorrect: false,
          label: "Orang tuanya sengaja memutus seluruh hubungan dengannya",
        },
        {
          isCorrect: false,
          label: "Norma Jeane sudah tidak mempunyai keluarga yang masih hidup",
        },
        {
          isCorrect: false,
          label: "Ia ditempatkan di panti karena ingin segera menjadi aktris",
        },
        {
          isCorrect: true,
          label:
            "Kesehatan mental dan keadaan ekonomi ibunya membuat pengasuhannya tidak stabil",
        },
      ],
    },
  },
};

export default item;
