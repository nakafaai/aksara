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
            "Keaslian dapat mencakup jejak perubahan lintas masa, bukan tiruan sempurna atas satu tahap sejarah.",
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
            "Keaslian mensyaratkan penghapusan seluruh jejak perawatan yang dilakukan setelah bangunan pertama kali digunakan.",
        },
      ],
    },
  },
};

export default item;
