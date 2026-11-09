import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "youth-pledge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa persatuan harus diambil dari bahasa dengan penutur terbanyak.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu tidak cocok karena memiliki tingkatan tutur yang rumit.",
        },
        {
          correct: false,
          label:
            "Nama bahasa sebaiknya diputuskan setelah kemerdekaan tercapai.",
        },
        {
          correct: false,
          label:
            "Bahasa daerah harus dihapus agar bangsa Indonesia dapat bersatu.",
        },
        {
          correct: true,
          label:
            "Nama bahasa sebaiknya selaras dengan nama bangsa dan tanah airnya.",
        },
      ],
    },
  },
};

export default item;
