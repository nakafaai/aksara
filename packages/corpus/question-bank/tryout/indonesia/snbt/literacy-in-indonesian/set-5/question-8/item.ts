import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengulang rangkaian seri dan paralel dengan lebih banyak unit sambil hanya mencatat nyala lampu, tanpa mengukur arus atau tegangan.",
        },
        {
          correct: true,
          label:
            "Mengukur arus dan tegangan pada rangkaian seri serta paralel bertegangan rendah dengan kondisi komponen yang sebanding dan alat ukur terkalibrasi.",
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
      ],
    },
  },
};

export default item;
