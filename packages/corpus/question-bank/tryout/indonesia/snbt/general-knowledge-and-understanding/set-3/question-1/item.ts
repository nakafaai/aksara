import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "kabin",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Seandainya semua kaca mobil diganti dengan bahan yang tembus inframerah gelombang panjang, kabin yang tertutup tetap dapat menjadi jauh lebih panas daripada udara luar.",
        },
        {
          column: 2,
          label:
            "Kaca biasa menahan inframerah, baik yang datang bersama cahaya matahari maupun yang dipancarkan oleh benda di dalam kabin.",
        },
        {
          column: 2,
          label:
            "Membuka sedikit kaca jendela kurang menolong karena pertukaran udara hanya berpengaruh kecil terhadap suhu kabin.",
        },
        {
          column: 1,
          label:
            "Pelindung kaca depan bekerja pada tahap sebelum energi matahari dipancarkan ulang oleh dasbor sebagai inframerah gelombang panjang.",
        },
      ],
    },
  },
};

export default item;
