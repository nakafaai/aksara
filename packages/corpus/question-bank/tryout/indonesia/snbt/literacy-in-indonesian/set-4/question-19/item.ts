import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Laju yang tercatat di Kota Baru mungkin lebih mendekati keadaan sebenarnya daripada laju di kecamatan lain.",
        },
        {
          column: 1,
          label:
            "Laju sebenarnya di kecamatan selain Kota Baru mungkin lebih tinggi daripada laju di tabel.",
        },
        {
          column: 2,
          label:
            "Kasus Kota Baru banyak karena warga kecamatan lain dirawat di rumah sakit Kota Baru dan tercatat di sana.",
        },
        {
          column: 1,
          label:
            "Selisih risiko sebenarnya antara warga Cibeureum dan warga Kota Baru mungkin lebih besar daripada yang terlihat di tabel.",
        },
      ],
    },
  },
};

export default item;
