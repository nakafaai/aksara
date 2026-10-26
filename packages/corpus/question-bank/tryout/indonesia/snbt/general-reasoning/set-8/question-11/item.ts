import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Setiap distrik di kota pasti berstatus banjir.",
        },
        {
          correct: false,
          label: "Distrik X tidak mungkin berstatus banjir.",
        },
        {
          correct: false,
          label: "Semua warga kota harus segera meninggalkan kota.",
        },
        {
          correct: true,
          label:
            "Penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
        {
          correct: false,
          label:
            "Tidak dapat ditentukan apakah penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
      ],
    },
  },
};

export default item;
