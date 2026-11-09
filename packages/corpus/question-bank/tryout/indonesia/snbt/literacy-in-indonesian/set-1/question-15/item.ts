import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Warna jingga yang tampak di langit",
        },
        {
          correct: true,
          label: "Waktu setengah gelap setelah matahari terbenam",
        },
        {
          correct: false,
          label: "Saat matahari tepat menyentuh cakrawala",
        },
        {
          correct: false,
          label: "Tanda bahwa seluruh kegiatan harus berakhir",
        },
        {
          correct: false,
          label: "Suasana yang selalu tenang dan damai",
        },
      ],
    },
  },
};

export default item;
