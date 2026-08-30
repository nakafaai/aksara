import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Tindakan mengurangi dampak bencana" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Pemantauan pergerakan gajah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Perlindungan satwa liar" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Penghapusan semua sumber bahaya" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tindakan mendeteksi posisi" }],
        },
      ],
    },
  },
};

export default item;
