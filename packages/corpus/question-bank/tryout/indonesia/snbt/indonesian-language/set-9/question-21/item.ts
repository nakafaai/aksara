import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laras menghadapi hambatan dalam menikmati hutan kota tanpa mengejar seluruh titik foto dan menunggu seluruh proyek selesai sebelum meminta satu pun peninjauan.",
        },
        {
          isCorrect: false,
          label:
            "Laras menghadapi hambatan dalam menikmati hutan kota tanpa mengejar seluruh titik foto dan menyerahkan langkah berikutnya kepada tokoh lain agar masalah segera berakhir.",
        },
        {
          isCorrect: false,
          label:
            "Laras menghadapi hambatan dalam menikmati hutan kota tanpa mengejar seluruh titik foto dan memahami empati sebagai gagasan yang tidak berubah melalui pilihan tokoh.",
        },
        {
          isCorrect: true,
          label:
            "Laras menghadapi hambatan dalam menikmati hutan kota tanpa mengejar seluruh titik foto dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
        {
          isCorrect: false,
          label:
            "Laras menghadapi hambatan dalam menikmati hutan kota tanpa mengejar seluruh titik foto dan menempatkan pencatatan ketidakpastian di atas tindakan kecil yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
