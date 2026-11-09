import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "taman-siswa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sekolah dibayangkan sebagai tempat anak tumbuh dan bermain dengan gembira.",
        },
        {
          correct: false,
          label:
            "Gedung sekolah itu dibangun di tengah sebuah taman kota di Yogyakarta.",
        },
        {
          correct: false,
          label:
            "Para siswanya diwajibkan merawat tanaman di halaman sekolah setiap hari.",
        },
        {
          correct: false,
          label:
            "Nama itu diberikan oleh pemerintah kolonial ketika sekolahnya disahkan.",
        },
        {
          correct: false,
          label:
            "Nama itu diambil dari semboyan yang kini dikenal sebagai tut wuri handayani.",
        },
      ],
    },
  },
};

export default item;
