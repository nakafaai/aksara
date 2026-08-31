import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: true,
          label:
            "Nisa mengubah kesulitan melewati lorong pasar menjadi catatan rute dan usulan tanda akses, lalu ikut menilai tanda yang diuji pengelola.",
        },
        {
          isCorrect: false,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
