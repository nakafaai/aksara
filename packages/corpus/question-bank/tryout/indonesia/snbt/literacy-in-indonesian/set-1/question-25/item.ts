import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebuah kota mengganti bentuk huruf semua rambu jalan dengan biaya besar, dan pengemudi perlu waktu lama untuk terbiasa, sehingga kekhawatiran warga terbukti.",
        },
        {
          correct: false,
          label:
            "Sebuah kota mengganti bentuk huruf semua rambu jalan, dan pengemudi tetap memahami rambu itu karena kata-katanya sama, sehingga penggantian itu tidak memakan biaya apa pun.",
        },
        {
          correct: false,
          label:
            "Sebuah kota mengganti nama-nama jalan sekaligus bentuk hurufnya, tetapi pengemudi tetap memahami rambu lama karena kata-katanya sama.",
        },
        {
          correct: true,
          label:
            "Sebuah kota mengganti bentuk huruf semua rambu jalan dengan biaya besar, tetapi pengemudi tetap dapat membaca rambu lama karena kata-katanya sama.",
        },
        {
          correct: false,
          label:
            "Sebuah penerbit menerjemahkan novel lama ke bahasa sehari-hari dengan biaya besar, tetapi pembaca muda tetap dapat membaca versi aslinya karena isinya sama.",
        },
      ],
    },
  },
};

export default item;
