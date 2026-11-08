import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "youth-pledge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa Melayu memiliki jumlah penutur asli paling banyak di Nusantara.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu ditetapkan oleh pemerintah kolonial sebagai bahasa wajib.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu memiliki kosakata paling lengkap di antara bahasa daerah.",
        },
        {
          correct: true,
          label:
            "Bahasa Melayu sudah luas dipahami dan tingkatan tuturnya lebih setara.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu hanya dipakai oleh para pemuda yang hadir dalam kongres.",
        },
      ],
    },
  },
};

export default item;
