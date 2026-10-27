import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          correct: false,
          label:
            "Tidak terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
        {
          correct: false,
          label:
            "Peningkatan keamanan mencegah seluruh kejahatan pada hari Minggu lalu.",
        },
        {
          correct: false,
          label:
            "Tidak terjadi kejahatan di Kampung Bambu sejak hari Minggu lalu.",
        },
        {
          correct: true,
          label: "Terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
        },
      ],
    },
  },
};

export default item;
