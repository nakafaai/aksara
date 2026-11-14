import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "bantaran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kelurahan akan kembali menyumbangkan cat ketika dinding kampung itu mulai pudar.",
        },
        {
          correct: true,
          label:
            "Mural di kampung itu ikut menentukan besarnya dana untuk merawat mural itu sendiri.",
        },
        {
          correct: false,
          label:
            "Uang parkir pengunjung selama ini sudah cukup untuk mengecat ulang seluruh kampung.",
        },
        {
          correct: false,
          label:
            "Pengunjung tertarik datang karena dinding kampung itu dicat ulang setiap dua tahun.",
        },
        {
          correct: false,
          label:
            "Kebiasaan warga membuang sampah ke sungai membuat cat dinding kampung itu cepat pudar.",
        },
      ],
    },
  },
};

export default item;
