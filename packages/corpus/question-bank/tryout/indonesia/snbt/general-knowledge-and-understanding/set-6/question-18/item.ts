import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
        {
          isCorrect: true,
          label:
            "Intervensi minimum dapat mempertahankan lebih banyak informasi sejarah selama bagian berbahaya tetap ditangani.",
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
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
