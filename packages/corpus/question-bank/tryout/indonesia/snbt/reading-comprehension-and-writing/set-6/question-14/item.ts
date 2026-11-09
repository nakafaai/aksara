import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "water-turn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petani hulu ingin pintu air dibuka lebih lama untuk sawah mereka.",
        },
        {
          correct: false,
          label: "Harga gabah naik selama dua tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Sebagian petani hilir mulai menanam jagung pada musim kemarau.",
        },
        {
          correct: false,
          label:
            "Pada musim kemarau tahun lalu, hujan turun jauh lebih sering daripada biasanya.",
        },
        {
          correct: true,
          label:
            "Curah hujan pada dua musim kemarau terakhir sama rendahnya dengan musim kemarau sebelum jadwal dibuat.",
        },
      ],
    },
  },
};

export default item;
