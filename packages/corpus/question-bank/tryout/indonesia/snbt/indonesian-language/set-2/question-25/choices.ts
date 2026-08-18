import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Seluruh individu meninggal dalam badai yang sama", value: false },
    {
      label: "Jasad-jasad tersebut tidak berasal dari satu peristiwa kematian",
      value: true,
    },
    {
      label: "Kelompok Mediterania timur merupakan kelompok tertua",
      value: false,
    },
    {
      label: "Semua individu Asia Selatan meninggal pada hari yang sama",
      value: false,
    },
    {
      label: "Penanggalan radiokarbon membuktikan penyebab kematian",
      value: false,
    },
  ],
};

export default choices;
