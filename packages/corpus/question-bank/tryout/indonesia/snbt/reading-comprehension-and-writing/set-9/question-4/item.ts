import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label baki membuat jumlah bibit yang sampai tanpa dialihkan tidak perlu diukur.",
        },
        {
          correct: false,
          label:
            "Label baki memungkinkan banyak unsur distribusi diubah sekaligus.",
        },
        {
          correct: false,
          label:
            "Label dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Label dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          correct: true,
          label:
            "Label pada baki menunjukkan petak tujuan ketika relawan harus memilih arah di percabangan.",
        },
      ],
    },
  },
};

export default item;
