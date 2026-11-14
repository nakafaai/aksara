import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "butterfly-garden",
  versions: {
    id: {
      columns: [
        "Jenis tumbuhan",
        "Perubahan setelah tumbuhan inang ditanam",
        "Hasil pencatatan",
      ],
      kind: "matrix",
      statements: [
        { column: 1, label: "Soka dan bunga tahi ayam menghasilkan nektar." },
        { column: 2, label: "Telur kecil ditemukan di balik daun jeruk." },
        {
          column: 3,
          label: "Rata-rata terlihat 17 ekor dari 7 jenis pada bulan keempat.",
        },
        { column: 2, label: "Ulat memakan daun hingga berlubang." },
      ],
    },
  },
};

export default item;
