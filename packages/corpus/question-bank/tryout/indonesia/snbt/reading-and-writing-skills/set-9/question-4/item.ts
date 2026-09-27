import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label baki membuat jumlah bibit yang sampai tanpa dialihkan tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Label baki memungkinkan banyak unsur distribusi diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Label dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Label dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Label pada baki menunjukkan petak tujuan ketika relawan harus memilih arah di percabangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
