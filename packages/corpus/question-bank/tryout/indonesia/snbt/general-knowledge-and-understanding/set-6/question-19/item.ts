import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pihak menganggap tampilan baru yang bersih akan lebih menarik bagi pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          isCorrect: true,
          label:
            "Pemetaan dan sampel menunjukkan sebagian kayu perlu diganti, sedangkan banyak bagian lain dapat diperkuat.",
        },
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
