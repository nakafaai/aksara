import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Norma Jeane menolak tinggal bersama ibunya",
      value: false,
    },
    {
      label: "Orang tuanya sengaja memutus seluruh hubungan dengannya",
      value: false,
    },
    {
      label:
        "Kesehatan mental dan keadaan ekonomi ibunya membuat pengasuhannya tidak stabil",
      value: true,
    },
    {
      label: "Norma Jeane sudah tidak mempunyai keluarga yang masih hidup",
      value: false,
    },
    {
      label: "Ia ditempatkan di panti karena ingin segera menjadi aktris",
      value: false,
    },
  ],
};

export default choices;
