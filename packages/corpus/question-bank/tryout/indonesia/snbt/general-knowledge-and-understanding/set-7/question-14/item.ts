import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagian awal menetapkan naskah tertulis sebagai versi asli, lalu bagian berikutnya menghapus variasi lisan dari pertunjukan.",
        },
        {
          correct: true,
          label:
            "Keragaman sumber mendorong rancangan panggung, lalu uji penonton memperbaiki penyajian dan catatan program menjelaskan perubahan.",
        },
        {
          correct: false,
          label:
            "Bagian awal menggabungkan versi tanpa penjelasan, lalu bagian berikutnya menyembunyikan sumber agar penonton bebas menafsirkan.",
        },
        {
          correct: false,
          label:
            "Bagian awal menolak perubahan cerita, lalu bagian berikutnya mengukur kesetiaan melalui kesamaan setiap kata dengan naskah.",
        },
        {
          correct: false,
          label:
            "Bagian awal menguji tanggapan penonton, lalu bagian berikutnya memilih versi tertua berdasarkan suara terbanyak.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
