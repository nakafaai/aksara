import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "island-teacher",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bu Asih menyeberang ke Pulau Gesik dengan kapal motor seperti biasa.",
        },
        {
          column: 1,
          label:
            "Bu Asih menulis surat pengunduran diri setelah usulan kenaikan honornya ditolak.",
        },
        {
          column: 2,
          label: "Semua murid datang ke sekolah pada hari itu.",
        },
        {
          column: 1,
          label: "Murid-murid membersihkan ruang kelas sebelum Bu Asih tiba.",
        },
      ],
    },
  },
};

export default item;
