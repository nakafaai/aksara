import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "untuk memastikan kanopi selalu lebih panas daripada lapangan",
        },
        {
          isCorrect: false,
          label: "untuk mengganti semua data dari kebun belakang",
        },
        {
          isCorrect: false,
          label: "untuk membuktikan kipas tidak bekerja",
        },
        {
          isCorrect: true,
          label:
            "untuk membandingkan efek peneduh tanpa langsung melibatkan pohon",
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
