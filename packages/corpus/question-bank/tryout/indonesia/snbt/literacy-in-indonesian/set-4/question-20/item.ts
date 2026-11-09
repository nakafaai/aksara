import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "regional-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa daerah sebaiknya menggantikan bahasa Indonesia di sekolah.",
        },
        {
          correct: true,
          label:
            "Bahasa daerah perlu diselamatkan dan sekolah dapat ikut berperan.",
        },
        {
          correct: false,
          label:
            "Setiap sekolah wajib memakai bahasa daerah provinsi setiap hari.",
        },
        {
          correct: false,
          label:
            "Orang tua sebaiknya dilarang berbahasa Indonesia kepada anaknya.",
        },
        {
          correct: false,
          label:
            "Murid perlu belajar sembilan bahasa daerah sekaligus di kelas.",
        },
      ],
    },
  },
};

export default item;
