import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "naungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di kedua jenis lereng, tanaman kopi di kebun bernaungan rata-rata lebih tua daripada tanaman kopi di kebun tanpa naungan, dan kopi yang lebih tua umumnya berbuah lebih sedikit.",
        },
        {
          correct: false,
          label:
            "Di lereng curam, kebun bernaungan lebih sering dipupuk daripada kebun tanpa naungan, sedangkan di lereng landai kedua jenis kebun dipupuk sama seringnya.",
        },
        {
          correct: true,
          label:
            "Di kedua jenis lereng, hampir semua kebun bernaungan dipangkas secara rutin, sedangkan hampir semua kebun tanpa naungan tidak pernah dipangkas, dan pemangkasan rutin menaikkan hasil kopi.",
        },
        {
          correct: false,
          label:
            "Pada musim panen tahun lalu, curah hujan di lereng curam jauh lebih tinggi daripada di lereng landai sehingga banyak bunga kopi di lereng curam rontok.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil seluruh kebun bernaungan lebih rendah daripada rata-rata hasil seluruh kebun tanpa naungan.",
        },
      ],
    },
  },
};

export default item;
