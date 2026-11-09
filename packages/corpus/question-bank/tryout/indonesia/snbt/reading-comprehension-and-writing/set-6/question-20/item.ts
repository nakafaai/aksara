import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "bike-parking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sejak tempat parkir dibangun dan sepeda dipinjamkan, makin banyak siswa bersepeda dan makin sedikit siswa yang diantar sepeda motor.",
        },
        {
          correct: false,
          label:
            "Semua siswa yang dulu diantar sepeda motor kini datang dengan bersepeda.",
        },
        {
          correct: false,
          label:
            "Tempat parkir sepeda membuat siswa tidak pernah lagi diantar pada musim hujan.",
        },
        {
          correct: false,
          label: "Jumlah seluruh siswa sekolah itu turun dari bulan ke bulan.",
        },
        {
          correct: false,
          label: "Antrean kendaraan di depan gerbang sekolah makin panjang.",
        },
      ],
    },
  },
};

export default item;
