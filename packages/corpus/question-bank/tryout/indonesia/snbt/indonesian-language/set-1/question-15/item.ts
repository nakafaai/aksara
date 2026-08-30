import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Warna jingga yang tampak di langit",
        },
        {
          isCorrect: false,
          label: "Saat matahari tepat menyentuh cakrawala",
        },
        {
          isCorrect: false,
          label: "Tanda bahwa seluruh kegiatan harus berakhir",
        },
        {
          isCorrect: true,
          label: "Waktu setengah gelap setelah matahari terbenam",
        },
        {
          isCorrect: false,
          label: "Suasana yang selalu tenang dan damai",
        },
      ],
    },
  },
};

export default item;
