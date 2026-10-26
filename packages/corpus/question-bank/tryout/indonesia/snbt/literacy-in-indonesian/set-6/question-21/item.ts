import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          correct: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          correct: true,
          label:
            "Sari mengurangi bantuan dari contoh lengkap menjadi pemeriksaan mandiri, lalu mengukur keberhasilan melalui kemampuan Dimas menjelaskan dan memperbaiki langkahnya.",
        },
        {
          correct: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan memahami penyangga belajar sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
