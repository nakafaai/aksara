import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "elektronik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pembeli akhir yang memakai barang hingga habis.",
        },
        {
          correct: true,
          label:
            "Orang yang mengumpulkan barang dari banyak sumber untuk dijual kembali.",
        },
        {
          correct: false,
          label: "Petugas kebersihan yang digaji pemerintah daerah.",
        },
        {
          correct: false,
          label: "Pemilik pabrik daur ulang berskala besar.",
        },
        {
          correct: false,
          label: "Perajin yang memperbaiki perangkat rusak.",
        },
      ],
    },
  },
};

export default item;
