import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "salinan kata demi kata dari satu ingatan yang dipilih",
        },
        {
          isCorrect: false,
          label:
            "pengisian bagian yang hilang dengan cerita rekaan tanpa penanda",
        },
        {
          isCorrect: false,
          label: "daftar peristiwa menurut tanggal tanpa membandingkan sumber",
        },
        {
          isCorrect: true,
          label:
            "penyusunan kembali penjelasan masa lalu dari jejak yang tersedia",
        },
        {
          isCorrect: false,
          label: "perbaikan fisik benda lama agar kembali tampak baru",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
