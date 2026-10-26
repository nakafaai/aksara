import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          correct: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          correct: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan memahami metakognisi sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          correct: true,
          label:
            "Raka mengatasi kebiasaan menunda proyek dokumentasi dengan tiga langkah terukur dan pemeriksaan teman, lalu menyelesaikan wawancara pertama serta memperbaiki jadwal.",
        },
        {
          correct: false,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
