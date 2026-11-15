import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "household-spending",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Makin besar pengeluaran per kapita sebuah kelompok, makin kecil porsi makanannya.",
        },
        {
          correct: false,
          label:
            "Kelompok $$20\\%$$ terbawah membelanjakan rupiah paling banyak untuk makanan.",
        },
        {
          correct: true,
          label:
            "Pengeluaran makanan per kapita kelompok $$20\\%$$ teratas lebih dari tiga kali pengeluaran makanan kelompok $$20\\%$$ terbawah.",
        },
        {
          correct: false,
          label:
            "Porsi makanan kelompok $$20\\%$$ teratas kurang dari separuh porsi makanan kelompok $$20\\%$$ terbawah.",
        },
        {
          correct: true,
          label:
            "Semua kelompok di bawah kelompok keempat membelanjakan lebih dari separuh pengeluarannya untuk makanan.",
        },
      ],
    },
  },
};

export default item;
