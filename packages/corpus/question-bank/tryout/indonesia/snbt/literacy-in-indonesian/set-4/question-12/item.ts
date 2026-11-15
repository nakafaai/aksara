import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "class-size",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua penulis sepakat bahwa anak kelas 1 dapat belajar lebih baik dalam kelas yang lebih kecil.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menolak hasil Project STAR karena percobaan itu tidak membagi siswa secara acak.",
        },
        {
          column: 1,
          label:
            "Usul Teks A membutuhkan $$20$$ kelas 1 tambahan di Kabupaten Lembah Hijau.",
        },
        {
          column: 2,
          label:
            "Menurut Teks B, hasil California lebih kecil karena kelas kecil memang tidak bermanfaat bagi siswa miskin.",
        },
      ],
    },
  },
};

export default item;
