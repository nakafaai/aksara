import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Petunjuk yang memakai ikon selalu dapat berdiri sendiri tanpa arahan petugas atau penjelasan tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Urutan layanan yang paling mudah dipahami harus diterapkan tanpa pengecualian agar pasien tidak bingung.",
        },
        {
          isCorrect: true,
          label:
            "Alat bantu menjadi lebih aman ketika isinya diperiksa, batas penggunaannya dinyatakan, dan arahan manusia tetap tersedia.",
        },
        {
          isCorrect: false,
          label:
            "Kesalahan mengikuti panah terjadi semata-mata karena Arum tidak mampu membaca nomor meja yang tersedia.",
        },
        {
          isCorrect: false,
          label:
            "Karena kartu berhasil membantu nenek Arum, kartu itu sudah terbukti sesuai untuk seluruh pasien klinik.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
