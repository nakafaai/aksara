import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "untuk menguji apakah suhu kanopi dapat mewakili suhu kebun belakang",
        },
        {
          isCorrect: true,
          label:
            "untuk membandingkan efek peneduh tanpa langsung melibatkan pohon",
        },
        {
          isCorrect: false,
          label:
            "untuk menjadikan data kanopi sebagai pengganti pengukuran kebun belakang",
        },
        {
          isCorrect: false,
          label:
            "untuk menunjukkan bahwa perbedaan suhu tetap muncul ketika kipas digunakan",
        },
        {
          isCorrect: false,
          label: "untuk mengurangi jumlah lokasi pengukuran",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
