import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "bike-parking",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jumlah siswa yang bersepeda pada bulan September tiga kali jumlah pada bulan Juni.",
        },
        {
          column: 1,
          label: "Jumlah siswa yang diantar sepeda motor turun setiap bulan.",
        },
        {
          column: 1,
          label:
            "Pertambahan siswa bersepeda dari Agustus ke September lebih kecil daripada pertambahan dari Juli ke Agustus.",
        },
        {
          column: 2,
          label:
            "Pada bulan September, siswa yang bersepeda lebih banyak daripada siswa yang diantar sepeda motor.",
        },
      ],
    },
  },
};

export default item;
