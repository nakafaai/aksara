import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "solar-lamps",
  versions: {
    id: {
      columns: [
        "Masalah yang ditemukan",
        "Tindakan yang sudah dilakukan",
        "Rencana tahap berikutnya",
      ],
      kind: "matrix",
      statements: [
        {
          column: 3,
          label: "Kotak saran tanpa nama akan dipasang di balai desa.",
        },
        {
          column: 1,
          label: "Panel di bawah pohon ketapang tertutup daun dan debu.",
        },
        { column: 2, label: "Warga membersihkan panel setiap hari Jumat." },
        { column: 3, label: "Curah hujan akan dicatat setiap hari." },
      ],
    },
  },
};

export default item;
