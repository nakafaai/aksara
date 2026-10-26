import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengulang model perpindahan panas dengan lebih banyak unit, tetapi tetap memakai penyederhanaan yang sama tanpa pengamatan lapangan.",
        },
        {
          correct: false,
          label:
            "Mengubah seluruh faktor lapangan sekaligus, lalu membandingkan satu hasil akhir tanpa kondisi acuan.",
        },
        {
          correct: false,
          label:
            "Mengambil satu kejadian nyata yang sesuai dengan model sebagai konfirmasi bahwa pola selalu berlaku.",
        },
        {
          correct: true,
          label:
            "Menguji beberapa wadah aluminium dan polipropilena dengan bentuk, ketebalan, penutup, volume air, dan suhu awal yang sama serta mengacak posisinya pada setiap pengulangan.",
        },
        {
          correct: false,
          label:
            "Mengganti pengukuran dengan survei tentang apakah peserta memahami definisi istilah pada model.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
