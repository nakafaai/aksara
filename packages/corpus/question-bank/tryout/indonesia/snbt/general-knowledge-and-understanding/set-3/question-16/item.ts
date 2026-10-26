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
            "Peserta uji kedua ternyata telah menghafal rute evakuasi yang benar sebelum mendengar pesan revisi.",
        },
        {
          correct: false,
          label:
            "Kelompok baru dari kampung lain juga memahami rute dan waktu secara tepat setelah mendengar versi revisi.",
        },
        {
          correct: false,
          label:
            "Siaran kedua dengan versi revisi yang sama dibacakan lebih lambat dan menghasilkan ingatan rute yang sedikit lebih akurat.",
        },
        {
          correct: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          correct: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
      ],
    },
  },
};

export default item;
