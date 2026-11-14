import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "bangsal",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sif malam menangani kurang dari seperenam seluruh pemberian obat, tetapi menyumbang lebih dari seperlima seluruh kesalahan pencatatan.",
        },
        {
          column: 2,
          label:
            "Jika banyak kesalahan pencatatan dibagi banyak perawat yang bertugas, hasil untuk sif sore lebih besar daripada hasil untuk sif pagi.",
        },
        {
          column: 2,
          label:
            "Seandainya angka kesalahan sif malam turun menjadi sama dengan angka kesalahan sif sore, sedangkan banyak pemberian obat tetap, banyak kesalahan pencatatan seluruh bangsal turun lebih dari $$10\\%$$.",
        },
        {
          column: 1,
          label:
            "Angka kesalahan untuk seluruh bangsal lebih rendah daripada angka kesalahan sif sore.",
        },
      ],
    },
  },
};

export default item;
