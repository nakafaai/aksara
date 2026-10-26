import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tampilan seragam dapat mengaburkan sejarah jika menutupi jejak perubahan yang dibuktikan oleh material bangunan.",
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
          correct: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
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
