import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: true,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
        {
          isCorrect: false,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
