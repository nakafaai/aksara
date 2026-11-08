import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "piring",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Makanan yang benar-benar dimakan setiap karyawan dalam sekali makan siang turun $$50$$ gram.",
        },
        {
          column: 1,
          label:
            "Persentase karyawan yang mengambil makanan hanya sekali turun dari $$85\\%$$ menjadi $$75\\%$$.",
        },
        {
          column: 2,
          label:
            "Sisa makanan yang dibuang setiap karyawan turun lebih dari separuhnya.",
        },
        {
          column: 2,
          label:
            "Setelah piring diganti, sisa makanan lebih dari $$10\\%$$ makanan yang diambil.",
        },
      ],
    },
  },
};

export default item;
