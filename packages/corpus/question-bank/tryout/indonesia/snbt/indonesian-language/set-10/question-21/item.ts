import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
