import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "air-sensor",
  versions: {
    id: {
      columns: [
        "Kelebihan sensor murah",
        "Penyebab pembacaan keliru",
        "Saran penggunaan",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Butir air pada udara lembap ikut terhitung sebagai partikel.",
        },
        { column: 3, label: "Hasil dibaca sebagai rata-rata harian." },
        { column: 1, label: "Sensor dapat dipasang di banyak sekolah." },
        {
          column: 2,
          label:
            "Letak sensor yang terlalu dekat dengan dapur atau tempat parkir.",
        },
      ],
    },
  },
};

export default item;
