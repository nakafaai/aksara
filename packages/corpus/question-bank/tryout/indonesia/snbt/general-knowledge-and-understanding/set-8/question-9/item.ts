import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "purpose",
  },
  stimulus: "lontar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "agar naskah asli dapat dijual dengan harga tinggi kepada para kolektor di luar negeri",
        },
        {
          correct: false,
          label: "agar rayap dan jamur tidak lagi menyerang daun lontar",
        },
        {
          correct: true,
          label:
            "agar isi naskah tetap dapat dipelajari walaupun naskah aslinya rusak",
        },
        {
          correct: false,
          label: "agar warga berhenti menyimpan naskah lontar di rumah mereka",
        },
        {
          correct: false,
          label: "agar daun lontar tidak perlu lagi direbus dan dikeringkan",
        },
      ],
    },
  },
};

export default item;
