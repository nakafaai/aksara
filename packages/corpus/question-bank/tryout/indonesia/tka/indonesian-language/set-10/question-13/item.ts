import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "mini-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pernyataan itu berlebihan karena baru 360 dari 600 siswa yang menabung dan setoran turun pada akhir semester",
        },
        {
          correct: false,
          label:
            "pernyataan itu tepat karena jumlah penabung naik pada tahun kedua",
        },
        {
          correct: false,
          label:
            "pernyataan itu tepat karena petugas bank mini bergiliran setiap bulan",
        },
        {
          correct: false,
          label: "pernyataan itu salah karena tidak ada siswa yang menabung",
        },
        {
          correct: false,
          label:
            "pernyataan itu tidak relevan karena bank mini didampingi bank daerah",
        },
      ],
    },
  },
};

export default item;
