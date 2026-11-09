import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "social-media-age",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Penulis menilai pemindaian wajah sebagai cara pemeriksaan usia yang paling aman.",
        },
        {
          column: 1,
          label:
            "Sebagian besar platform selama ini memeriksa usia hanya dengan menanyakan tanggal lahir.",
        },
        {
          column: 1,
          label:
            "Menurut penulis, larangan dapat mendorong remaja pindah ke aplikasi yang lebih sulit diawasi.",
        },
        {
          column: 2,
          label:
            "Penulis mengusulkan agar notifikasi akun remaja dimatikan sepanjang hari.",
        },
      ],
    },
  },
};

export default item;
