import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "radio-repair",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Ibu gadis itu menyarankan agar radio tersebut dibuang.",
        },
        {
          column: 2,
          label:
            "Pak Darsa berhasil menangkap kembali siaran wayang yang dulu didengar sang kakek.",
        },
        {
          column: 2,
          label: "Gadis itu datang terlambat ketika mengambil radionya.",
        },
        {
          column: 1,
          label: "Pak Darsa mengganti dua kapasitor yang menggembung.",
        },
      ],
    },
  },
};

export default item;
