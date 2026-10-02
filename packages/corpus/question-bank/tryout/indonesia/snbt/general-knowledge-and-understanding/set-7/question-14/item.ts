import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan naskah tertulis sebagai versi asli, lalu bagian berikutnya menghapus variasi lisan dari pertunjukan.",
        },
        {
          isCorrect: true,
          label:
            "Keragaman sumber mendorong rancangan panggung, lalu uji penonton memperbaiki penyajian dan catatan program menjelaskan perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menggabungkan versi tanpa penjelasan, lalu bagian berikutnya menyembunyikan sumber agar penonton bebas menafsirkan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menolak perubahan cerita, lalu bagian berikutnya mengukur kesetiaan melalui kesamaan setiap kata dengan naskah.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menguji tanggapan penonton, lalu bagian berikutnya memilih versi tertua berdasarkan suara terbanyak.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
