import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "ai-homework",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua penulis sepakat bahwa pekerjaan rumah ada untuk melatih siswa berpikir.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menolak cara pemeriksaan lisan yang dipakai penulis Teks A.",
        },
        {
          column: 1,
          label:
            "Penelitian yang dikutip Teks B melemahkan anggapan bahwa larangan dapat ditegakkan dengan alat pendeteksi.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B membantah bahwa sebagian siswa tidak dapat menjelaskan esainya sendiri.",
        },
        {
          column: 1,
          label:
            "Dalam usul Teks B, siswa yang memakai kecerdasan buatan tetap harus menunjukkan pemikirannya sendiri.",
        },
      ],
    },
  },
};

export default item;
