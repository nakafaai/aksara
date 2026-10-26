import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petunjuk yang memakai ikon selalu dapat berdiri sendiri tanpa arahan petugas atau penjelasan tambahan.",
        },
        {
          correct: false,
          label:
            "Urutan layanan yang paling mudah dipahami harus diterapkan tanpa pengecualian agar pasien tidak bingung.",
        },
        {
          correct: true,
          label:
            "Alat bantu menjadi lebih aman ketika isinya diperiksa, batas penggunaannya dinyatakan, dan arahan manusia tetap tersedia.",
        },
        {
          correct: false,
          label:
            "Kesalahan mengikuti panah terjadi semata-mata karena Arum tidak mampu membaca nomor meja yang tersedia.",
        },
        {
          correct: false,
          label:
            "Karena kartu berhasil membantu nenek Arum, kartu itu sudah terbukti sesuai untuk seluruh pasien klinik.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
