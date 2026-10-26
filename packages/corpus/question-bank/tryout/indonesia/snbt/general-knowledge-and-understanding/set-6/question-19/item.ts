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
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
        },
        {
          correct: false,
          label:
            "Sebagian pihak menganggap tampilan baru yang bersih akan lebih menarik bagi pengunjung.",
        },
        {
          correct: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          correct: true,
          label:
            "Pemetaan dan sampel menunjukkan sebagian kayu perlu diganti, sedangkan banyak bagian lain dapat diperkuat.",
        },
        {
          correct: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
      ],
    },
  },
};

export default item;
