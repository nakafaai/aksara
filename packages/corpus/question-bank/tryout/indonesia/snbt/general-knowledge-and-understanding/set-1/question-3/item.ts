import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "leuit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Leuit dibangun dalam bentuk panggung agar padi di dalamnya tetap kering.",
        },
        {
          correct: false,
          label:
            "Masyarakat adat melarang semua bentuk perdagangan hasil pertanian.",
        },
        {
          correct: false,
          label:
            "Gagal panen sering terjadi di kampung adat Jawa Barat dan Banten.",
        },
        {
          correct: true,
          label:
            "Padi di leuit menjadi cadangan pangan, yang di beberapa komunitas dijaga dengan aturan khusus.",
        },
        {
          correct: false,
          label:
            "Padi bertangkai lebih tahan terhadap serangga daripada beras.",
        },
      ],
    },
  },
};

export default item;
