import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
