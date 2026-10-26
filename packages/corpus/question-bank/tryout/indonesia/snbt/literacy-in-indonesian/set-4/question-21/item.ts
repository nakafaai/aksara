import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          correct: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          correct: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan memahami advokasi diri sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          correct: true,
          label:
            "Nisa mengubah kesulitan melewati lorong pasar menjadi catatan rute dan usulan tanda akses, lalu diminta menilai tanda yang diuji pengelola.",
        },
        {
          correct: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
