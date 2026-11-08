import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "jalur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Biaya pembangunan jalur sepeda di jalan utama lain tidak lebih mahal daripada di Jalan Merdeka.",
        },
        {
          correct: false,
          label:
            "Semua jalan utama di kota itu sama padatnya dengan Jalan Merdeka.",
        },
        {
          correct: false,
          label:
            "Jumlah pesepeda di kota itu akan meningkat setelah jalur sepeda dibangun.",
        },
        {
          correct: false,
          label:
            "Jumlah kecelakaan kendaraan bermotor di Jalan Merdeka juga menurun pada tahun setelah jalur sepeda itu dibuka.",
        },
        {
          correct: true,
          label:
            "Penurunan kecelakaan di Jalan Merdeka tidak terutama terjadi karena pesepeda beralih ke jalan lain.",
        },
      ],
    },
  },
};

export default item;
