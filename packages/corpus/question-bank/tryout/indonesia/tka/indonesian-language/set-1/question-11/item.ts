import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "heat-map",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "untuk menguji apakah suhu kanopi dapat mewakili suhu kebun belakang",
        },
        {
          correct: true,
          label:
            "untuk membandingkan efek peneduh tanpa langsung melibatkan pohon",
        },
        {
          correct: false,
          label:
            "untuk menjadikan data kanopi sebagai pengganti pengukuran kebun belakang",
        },
        {
          correct: false,
          label:
            "untuk menunjukkan bahwa perbedaan suhu tetap muncul ketika kipas digunakan",
        },
        {
          correct: false,
          label: "untuk mengurangi jumlah lokasi pengukuran",
        },
      ],
    },
  },
};

export default item;
