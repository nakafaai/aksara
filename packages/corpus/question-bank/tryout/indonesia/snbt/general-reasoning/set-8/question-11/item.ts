import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap distrik di kota pasti berstatus banjir.",
        },
        {
          isCorrect: false,
          label: "Distrik X tidak mungkin berstatus banjir.",
        },
        {
          isCorrect: false,
          label: "Semua warga kota harus segera meninggalkan kota.",
        },
        {
          isCorrect: true,
          label:
            "Penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
        {
          isCorrect: false,
          label:
            "Tidak dapat ditentukan apakah penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
      ],
    },
  },
};

export default item;
