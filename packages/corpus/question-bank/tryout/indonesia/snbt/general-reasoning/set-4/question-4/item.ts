import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "dompet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pedagang yang belum memakai dompet digital bersedia memakainya walaupun tidak diwajibkan.",
        },
        {
          correct: false,
          label:
            "Biaya layanan dompet digital yang ditanggung setiap pedagang lebih kecil daripada tambahan omzet yang diperolehnya.",
        },
        {
          correct: true,
          label:
            "Tambahan omzet para pengguna tidak seluruhnya berasal dari pembeli yang beralih dari pedagang lain di pasar itu.",
        },
        {
          correct: false,
          label:
            "Tidak ada pembeli yang beralih dari pedagang bukan pengguna ke pedagang pengguna dompet digital.",
        },
        {
          correct: false,
          label:
            "Omzet harian setiap pengguna dompet digital naik dengan besar yang sama, yaitu $$\\text{Rp}0{,}8$$ juta.",
        },
      ],
    },
  },
};

export default item;
