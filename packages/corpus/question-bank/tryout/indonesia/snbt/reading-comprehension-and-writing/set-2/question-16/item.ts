import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "bantaran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah pengunjung akhir pekan Kampung Lebak Tirta bertambah pesat dalam dua tahun.",
        },
        {
          correct: false,
          label:
            "Sampah yang diangkat dari sungai setiap pekan tidak berkurang sejak kampung itu dicat.",
        },
        {
          correct: false,
          label:
            "Pengunjung yang datang untuk berfoto menambah sampah yang dibuang ke sungai.",
        },
        {
          correct: true,
          label:
            "Ramainya kampung itu belum diikuti oleh berubahnya kebiasaan sebagian warga membuang sampah ke sungai.",
        },
        {
          correct: false,
          label:
            "Kampung warna berhasil menarik pengunjung sekaligus mengurangi sampah di sungai.",
        },
      ],
    },
  },
};

export default item;
