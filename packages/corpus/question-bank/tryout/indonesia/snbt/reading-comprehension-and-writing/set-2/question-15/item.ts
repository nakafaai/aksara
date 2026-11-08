import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "medicine-delivery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Banyak relawan muda lebih suka bekerja di kota besar.",
        },
        {
          correct: false,
          label: "Harga obat di apotek swasta terus naik setiap tahun.",
        },
        {
          correct: false,
          label: "Dokter puskesmas juga melayani pemeriksaan gigi setiap hari Jumat.",
        },
        {
          correct: false,
          label: "Oleh karena itu, program antar obat sebaiknya dihentikan.",
        },
        {
          correct: true,
          label: "Program sederhana itu menunjukkan bahwa perhatian rutin dapat menjaga kesehatan warga lanjut usia.",
        },
      ],
    },
  },
};

export default item;
