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
              text: "Norma Jeane menolak tinggal bersama ibunya",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Orang tuanya sengaja memutus seluruh hubungan dengannya",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kesehatan mental dan keadaan ekonomi ibunya membuat pengasuhannya tidak stabil",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Norma Jeane sudah tidak mempunyai keluarga yang masih hidup",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ia ditempatkan di panti karena ingin segera menjadi aktris",
            },
          ],
        },
      ],
    },
  },
};

export default item;
