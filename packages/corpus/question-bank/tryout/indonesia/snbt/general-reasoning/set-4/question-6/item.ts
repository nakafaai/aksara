import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "dompet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Para pedagang yang mulai memakai dompet digital pada Mei rata-rata beromzet lebih kecil daripada pedagang yang memakainya sejak Maret, tetapi lebih besar daripada pedagang yang sampai Juli tetap tidak memakainya.",
        },
        {
          correct: false,
          label:
            "Para pedagang yang mulai memakai dompet digital pada Mei rata-rata beromzet lebih kecil daripada pedagang yang sampai Juli tetap tidak memakainya.",
        },
        {
          correct: false,
          label:
            "Para pedagang yang mulai memakai dompet digital pada Mei baru sebentar memakainya sehingga omzet mereka belum sempat naik.",
        },
        {
          correct: false,
          label:
            "Sebagian pembeli beralih dari pedagang bukan pengguna ke pedagang pengguna dompet digital.",
        },
        {
          correct: false,
          label:
            "Para pedagang yang mulai memakai dompet digital pada Mei rata-rata beromzet lebih besar daripada pedagang yang memakainya sejak Maret.",
        },
      ],
    },
  },
};

export default item;
