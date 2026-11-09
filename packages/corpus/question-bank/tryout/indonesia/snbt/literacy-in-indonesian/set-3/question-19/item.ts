import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "village-tourism",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Teks 1 berencana menggelar upacara syukur panen setiap Sabtu.",
        },
        {
          column: 2,
          label: "Teks 2 menolak semua kegiatan wisata di desa itu.",
        },
        {
          column: 2,
          label:
            "Menurut Teks 2, warga boleh memasuki area keramat kapan saja.",
        },
        {
          column: 1,
          label:
            "Teks 2 mengusulkan agar lahan parkir dipindahkan ke luar kampung.",
        },
      ],
    },
  },
};

export default item;
