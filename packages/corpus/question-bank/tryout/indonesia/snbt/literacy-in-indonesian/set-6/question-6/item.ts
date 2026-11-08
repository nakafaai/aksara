import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "homework-debate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pekerjaan rumah sebaiknya dihapus di semua jenjang karena hanya membebani anak.",
        },
        {
          correct: false,
          label:
            "Pekerjaan rumah perlu ditambah agar murid sekolah dasar terbiasa belajar mandiri.",
        },
        {
          correct: true,
          label:
            "Pekerjaan rumah dihapus di sekolah dasar, sedangkan di sekolah menengah diubah bentuknya.",
        },
        {
          correct: false,
          label:
            "Pekerjaan rumah sebaiknya diperiksa dulu oleh orang tua sebelum dikumpulkan kepada guru.",
        },
        {
          correct: false,
          label:
            "Pekerjaan rumah mungkin paling bermanfaat jika dikerjakan bersama orang tua di rumah.",
        },
      ],
    },
  },
};

export default item;
