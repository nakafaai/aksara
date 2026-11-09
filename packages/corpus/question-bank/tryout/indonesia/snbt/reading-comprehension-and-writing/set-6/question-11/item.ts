import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "water-turn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Musim Kemarau di Indonesia",
        },
        {
          correct: false,
          label: "Petugas Pintu Air Desa Sukadamai",
        },
        {
          correct: false,
          label: "Perselisihan antara Petani Hulu dan Petani Hilir",
        },
        {
          correct: true,
          label: "Jadwal Giliran Air Mengakhiri Kekeringan Sawah Hilir",
        },
        {
          correct: false,
          label: "Cara Menanam Padi di Sawah Hilir",
        },
      ],
    },
  },
};

export default item;
