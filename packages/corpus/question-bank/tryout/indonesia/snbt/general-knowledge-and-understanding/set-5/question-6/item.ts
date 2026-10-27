import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "salinan kata demi kata dari satu ingatan yang dipilih",
        },
        {
          correct: false,
          label:
            "pengisian bagian yang hilang dengan cerita rekaan tanpa penanda",
        },
        {
          correct: false,
          label: "daftar peristiwa menurut tanggal tanpa membandingkan sumber",
        },
        {
          correct: true,
          label:
            "penyusunan kembali penjelasan masa lalu dari jejak yang tersedia",
        },
        {
          correct: false,
          label: "perbaikan fisik benda lama agar kembali tampak baru",
        },
      ],
    },
  },
};

export default item;
