import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "tangga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Poster membuat banyak perjalanan seluruhnya di gedung itu bertambah.",
        },
        {
          correct: false,
          label:
            "Pada minggu ke-$$8$$, pemakaian tangga sudah kembali sama dengan sebelum poster dipasang.",
        },
        {
          correct: true,
          label:
            "Pengaruh poster terhadap pemakaian tangga paling besar pada minggu pertama pemasangannya, lalu melemah.",
        },
        {
          correct: false,
          label:
            "Karyawan yang beralih ke tangga sebagian besar adalah karyawan yang berkantor di lantai-lantai rendah gedung itu.",
        },
        {
          correct: false,
          label:
            "Poster membuat pemakaian lift turun lebih dari separuh pada minggu ke-$$5$$.",
        },
      ],
    },
  },
};

export default item;
