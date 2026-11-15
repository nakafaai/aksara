import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keduanya sama-sama menambah $$25$$ siklus per tahun, tetapi penggosokan menambah kehilangan permukaan lebih besar, jadi penggosokan tampaknya juga merusak lewat cara lain.",
        },
        {
          correct: false,
          label:
            "Penggosokan menambah siklus basah kering lebih banyak daripada hilangnya lumut, sehingga wajar jika penggosokan juga menambah kehilangan permukaan lebih besar.",
        },
        {
          correct: false,
          label:
            "Penggosokan dan hilangnya lumut sama-sama menambah $$25$$ siklus basah kering per tahun, sehingga keduanya pasti menambah kehilangan permukaan dengan besar yang sama.",
        },
        {
          correct: false,
          label:
            "Hilangnya lumut menambah kehilangan permukaan lebih besar daripada penggosokan, walaupun keduanya menambah siklus basah kering dengan jumlah yang sama setiap tahun.",
        },
        {
          correct: false,
          label:
            "Siklus basah kering tidak berhubungan dengan kehilangan permukaan, karena kelompok dengan siklus terbanyak ternyata bukan kelompok yang paling rusak setelah empat tahun.",
        },
      ],
    },
  },
};

export default item;
