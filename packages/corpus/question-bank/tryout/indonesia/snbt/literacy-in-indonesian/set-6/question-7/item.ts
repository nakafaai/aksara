import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "fact-opinion",
  },
  stimulus: "homework-debate",
  versions: {
    id: {
      columns: ["Fakta", "Opini"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tinjauan penelitian menemukan hubungan pekerjaan rumah dan prestasi lebih kuat pada siswa sekolah menengah.",
        },
        {
          column: 1,
          label:
            "Tinjauan itu mencakup puluhan penelitian yang dilakukan di Amerika Serikat.",
        },
        {
          column: 2,
          label: "Pekerjaan rumah sebaiknya dihapus di sekolah dasar.",
        },
        {
          column: 2,
          label:
            "Waktu sore anak-anak lebih berguna untuk membaca, bermain, dan tidur cukup.",
        },
      ],
    },
  },
};

export default item;
