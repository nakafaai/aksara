import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: true,
          label:
            "Raka mengatasi kebiasaan menunda proyek dokumentasi dengan tiga langkah terukur dan pemeriksaan teman, lalu menyelesaikan wawancara pertama serta memperbaiki jadwal.",
        },
        {
          isCorrect: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
