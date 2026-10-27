import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          correct: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
        {
          correct: false,
          label:
            "Bangunan hanya dapat disebut autentik jika seluruh permukaannya dikembalikan ke satu warna lama.",
        },
        {
          correct: true,
          label:
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
        },
        {
          correct: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
      ],
    },
  },
};

export default item;
