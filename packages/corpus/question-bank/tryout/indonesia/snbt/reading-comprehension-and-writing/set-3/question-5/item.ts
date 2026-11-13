import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "weakening",
  },
  stimulus: "resapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Beberapa pekan sebelum musim hujan itu, gorong-gorong di mulut jalan Blok C yang selama ini menyempit diganti dengan gorong-gorong yang dua kali lebih lebar.",
        },
        {
          correct: false,
          label:
            "Beberapa pekan sebelum musim hujan itu, pengembang mengeruk lumpur dari selokan di semua blok perumahan.",
        },
        {
          correct: false,
          label:
            "Hujan di seluruh perumahan pada musim itu turun lebih merata sepanjang musim daripada hujan pada musim hujan tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Tanah di blok-blok lain lebih padat sehingga air hujan meresap lebih lambat daripada di Blok C.",
        },
        {
          correct: false,
          label:
            "Pada musim hujan itu, genangan tetap muncul di jalan Blok C setiap kali hujan deras turun.",
        },
      ],
    },
  },
};

export default item;
