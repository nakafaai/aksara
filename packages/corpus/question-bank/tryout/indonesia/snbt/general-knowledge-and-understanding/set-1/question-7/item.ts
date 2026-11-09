import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "elektronik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Penginapan* di dekat pantai itu selalu penuh pada akhir pekan.",
        },
        {
          correct: false,
          label: "*Pendapatan* para pengepul tidak menentu setiap bulan.",
        },
        {
          correct: true,
          label:
            "*Pembangunan* jembatan desa selesai lebih cepat daripada jadwal.",
        },
        {
          correct: false,
          label: "*Pemandian* air panas itu dikelola oleh warga setempat.",
        },
        {
          correct: false,
          label: "*Pemandangan* dari puncak bukit itu sangat luas.",
        },
      ],
    },
  },
};

export default item;
