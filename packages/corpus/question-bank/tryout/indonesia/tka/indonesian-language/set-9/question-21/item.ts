import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "refill-depot",
  versions: {
    id: {
      columns: [
        "Cara kerja depot",
        "Hasil pemeriksaan",
        "Tindak lanjut puskesmas",
      ],
      kind: "matrix",
      statements: [
        { column: 3, label: "Stiker dipasang di setiap depot yang lolos uji." },
        {
          column: 1,
          label: "Air disinari lampu ultraviolet untuk mematikan kuman.",
        },
        {
          column: 2,
          label: "Air dari 4 depot mengandung bakteri melebihi batas.",
        },
        {
          column: 2,
          label:
            "Petugas menemukan bahwa depot yang gagal jarang mengganti saringan.",
        },
      ],
    },
  },
};

export default item;
