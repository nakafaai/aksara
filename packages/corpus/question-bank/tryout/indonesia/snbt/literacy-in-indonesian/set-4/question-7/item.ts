import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ia sudah memutuskan merujuk Sumi, tetapi menunggu keluarga Sumi sendiri setuju, karena dulu ada rujukan yang berakhir di tengah jalan.",
        },
        {
          correct: false,
          label:
            "Ia meragukan hasil pengukuran Nia, sehingga ia memeriksa Sumi sendiri sebelum menyetujui rujukan yang diminta Nia dengan tergesa-gesa.",
        },
        {
          correct: false,
          label:
            "Ia menunggu hujan reda, karena jembatan dapat ditutup dan ambulans tidak akan bisa menyeberang malam itu.",
        },
        {
          correct: false,
          label:
            "Ia ingin Sumi tetap dirawat di poskesdes, tetapi akhirnya mengalah karena Mak Rosnah sendiri meminta Sumi segera dibawa ke kota.",
        },
        {
          correct: false,
          label:
            "Ia sengaja membiarkan Nia panik agar bidan muda itu belajar mengambil keputusan sendiri tanpa bantuannya.",
        },
      ],
    },
  },
};

export default item;
