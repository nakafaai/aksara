import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
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
          isCorrect: true,
          label:
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
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
