import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pemantauan pergerakan gajah",
        },
        {
          isCorrect: true,
          label: "Tindakan mengurangi dampak bencana",
        },
        {
          isCorrect: false,
          label: "Perlindungan satwa liar",
        },
        {
          isCorrect: false,
          label: "Penghapusan semua sumber bahaya",
        },
        {
          isCorrect: false,
          label: "Tindakan mendeteksi posisi",
        },
      ],
    },
  },
};

export default item;
