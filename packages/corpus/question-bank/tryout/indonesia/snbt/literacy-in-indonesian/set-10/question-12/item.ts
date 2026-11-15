import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
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
            "Lebih dari separuh siswa yang diperiksa penulis Teks A tidak dapat menjelaskan gagasan utama esainya sendiri.",
        },
        {
          column: 2,
          label:
            "Menurut Teks A, $$18$$ siswa sudah terbukti memakai aplikasi kecerdasan buatan.",
        },
        {
          column: 1,
          label:
            "Menurut Teks B, alat pendeteksi dapat merugikan siswa yang bukan penutur asli bahasa Inggris.",
        },
        {
          column: 2,
          label:
            "Menurut penelitian yang dikutip Teks B, alat pendeteksi tulisan mesin tidak pernah benar.",
        },
        {
          column: 2,
          label: "Teks B mengusulkan agar seluruh esai dikerjakan di kelas.",
        },
      ],
    },
  },
};

export default item;
