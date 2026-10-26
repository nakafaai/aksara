import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Susunan bahan terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          correct: true,
          label:
            "Nilai kelompok yang selesai sebelum batas waktu pada pertemuan uji melebihi nilai awal dan pembanding.",
        },
        {
          correct: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          correct: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          correct: false,
          label:
            "Uji singkat itu menetapkan hasil jangka panjang bagi semua kelas memasak.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
