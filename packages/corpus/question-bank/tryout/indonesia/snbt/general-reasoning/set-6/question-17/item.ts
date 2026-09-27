import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Tidak terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Peningkatan keamanan mencegah seluruh kejahatan pada hari Minggu lalu.",
        },
        {
          isCorrect: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu sejak hari Minggu lalu.",
        },
        {
          isCorrect: true,
          label: "Terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
      ],
    },
  },
};

export default item;
