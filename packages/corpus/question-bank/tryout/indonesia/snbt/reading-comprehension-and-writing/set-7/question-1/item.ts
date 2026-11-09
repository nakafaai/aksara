import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "medicine-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "diserahkan kepada dinas kesehatan, lalu dimusnahkan dengan alat pembakar khusus",
        },
        {
          correct: false,
          label: "dijual kembali kepada warga dengan harga murah",
        },
        {
          correct: false,
          label: "dibuang ke saluran air setelah dipilah",
        },
        {
          correct: false,
          label: "dipakai lagi oleh puskesmas untuk pasien lain",
        },
        {
          correct: false,
          label: "disimpan di kotak sampai tanggal kedaluwarsanya lewat",
        },
      ],
    },
  },
};

export default item;
