import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Keaslian dapat mencakup jejak perubahan lintas masa, bukan tiruan sempurna atas satu tahap sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Bangunan hanya dapat disebut autentik jika seluruh permukaannya dikembalikan ke satu warna lama.",
        },
        {
          isCorrect: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          isCorrect: false,
          label:
            "Keaslian mensyaratkan penghapusan seluruh jejak perawatan yang dilakukan setelah bangunan pertama kali digunakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
