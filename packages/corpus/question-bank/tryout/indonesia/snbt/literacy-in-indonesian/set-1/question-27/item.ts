import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Reporter" },
        { correct: false, label: "Kepala Desa" },
        {
          correct: false,
          label: "Ketua acara adat Festival Munara Beba Byak Karon",
        },
        { correct: false, label: "Penyuluh" },
        { correct: true, label: "Guru" },
      ],
    },
  },
};

export default item;
