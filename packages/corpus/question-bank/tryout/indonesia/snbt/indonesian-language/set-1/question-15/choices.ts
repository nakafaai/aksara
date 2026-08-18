import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Warna jingga yang tampak di langit",
      value: false,
    },
    {
      label: "Saat matahari tepat menyentuh cakrawala",
      value: false,
    },
    {
      label: "Tanda bahwa seluruh kegiatan harus berakhir",
      value: false,
    },
    {
      label: "Waktu setengah gelap setelah matahari terbenam",
      value: true,
    },
    {
      label: "Suasana yang selalu tenang dan damai",
      value: false,
    },
  ],
};

export default choices;
