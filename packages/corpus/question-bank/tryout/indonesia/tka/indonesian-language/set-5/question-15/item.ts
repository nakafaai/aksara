import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "air-sensor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "memasang sensor jauh dari sumber asap, mencatat lokasinya, dan membaca rata-rata hariannya",
        },
        {
          correct: false,
          label:
            "memasang sensor di samping dapur kantin agar lonjakan asap mudah terlihat",
        },
        {
          correct: false,
          label:
            "mengumumkan angka tertinggi setiap pagi sebagai kualitas udara sekolah",
        },
        {
          correct: false,
          label: "meminta kota mengganti stasiun resmi dengan sensor sekolah",
        },
        {
          correct: false,
          label:
            "mematikan sensor setiap kali hujan agar angkanya tetap rendah",
        },
      ],
    },
  },
};

export default item;
