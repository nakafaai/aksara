import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Tindakan mengurangi dampak bencana",
        },
        {
          correct: false,
          label: "Pemantauan pergerakan gajah",
        },
        {
          correct: false,
          label: "Perlindungan satwa liar",
        },
        {
          correct: false,
          label: "Penghapusan semua sumber bahaya",
        },
        {
          correct: false,
          label: "Tindakan mendeteksi posisi",
        },
      ],
    },
  },
};

export default item;
