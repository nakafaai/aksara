import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "quake-drill",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berjalan dengan tertib membuat siswa lebih cepat sampai di lapangan daripada berlari dan berdesakan.",
        },
        {
          correct: false,
          label: "Latihan pertama diadakan tanpa sirene.",
        },
        {
          correct: false,
          label:
            "Lapangan sekolah terlalu kecil untuk menampung seluruh siswa.",
        },
        {
          correct: false,
          label: "Siswa tidak perlu lagi berlindung di bawah meja.",
        },
        {
          correct: false,
          label: "Gempa sungguhan terjadi pada saat latihan keempat.",
        },
      ],
    },
  },
};

export default item;
