import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua laporan yang tidak anonim telah diverifikasi.",
        },
        {
          correct: false,
          label: "Sebagian laporan anonim telah diverifikasi.",
        },
        {
          correct: false,
          label: "Tidak ada laporan distrik yang anonim.",
        },
        {
          correct: false,
          label: "Setiap laporan yang diarsipkan telah diverifikasi.",
        },
        {
          correct: true,
          label:
            "Sebagian laporan distrik diarsipkan dan bukan laporan anonim.",
        },
      ],
    },
  },
};

export default item;
