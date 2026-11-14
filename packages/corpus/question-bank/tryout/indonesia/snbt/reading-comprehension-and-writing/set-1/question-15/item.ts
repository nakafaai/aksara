import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "kenikir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "penurunan kutu daun di bedeng yang dikelilingi kenikir dari bulan pertama sampai minggu kedua belas",
        },
        {
          correct: false,
          label:
            "selisih jumlah kepik antara bedeng yang dikelilingi kenikir dan bedeng lainnya",
        },
        {
          correct: true,
          label:
            "selisih rata-rata kutu daun per tanaman antara bedeng yang dikelilingi kenikir dan bedeng lainnya pada minggu kedua belas",
        },
        {
          correct: false,
          label:
            "selisih waktu antara kenikir mulai berbunga lebat dan kepik mulai ramai datang",
        },
        {
          correct: false,
          label:
            "perbedaan keadaan kebun sebelum dan sesudah pestisida kimia dihentikan",
        },
      ],
    },
  },
};

export default item;
