import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: true,
          label:
            "Sari mengurangi bantuan dari contoh lengkap menjadi pemeriksaan mandiri, lalu mengukur keberhasilan melalui kemampuan Dimas menjelaskan dan memperbaiki langkahnya.",
        },
        {
          isCorrect: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Sari menghadapi hambatan dalam membantu teman belajar tanpa mengambil alih tugasnya dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
