import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengulang model erosi dalam baki dengan lebih banyak unit, tetapi tetap memakai penyederhanaan yang sama tanpa pengamatan lapangan.",
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
          correct: false,
          label:
            "Mengganti pengukuran dengan survei tentang apakah peserta memahami definisi istilah pada model.",
        },
        {
          correct: true,
          label:
            "Membandingkan tanah terbawa dari petak lereng terbuka dan berpenutup yang memiliki kemiringan serta jenis tanah sebanding selama beberapa kejadian hujan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
