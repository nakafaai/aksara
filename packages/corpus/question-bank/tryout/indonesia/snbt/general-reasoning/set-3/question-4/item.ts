import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "bangsal",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Angka kesalahan sif pagi dan sif sore tidak akan naik setelah jadwal baru berlaku.",
        },
        {
          correct: false,
          label:
            "Perawat sif pagi dan sif sore yang bekerja lembur lebih dari $$7$$ jam juga lebih sering salah mencatat.",
        },
        {
          correct: false,
          label:
            "Pemberian obat pada pukul 04.00 sampai 07.00 kurang dari separuh seluruh pemberian obat sif malam.",
        },
        {
          correct: true,
          label:
            "Pemberian obat pada pukul 04.00 sampai 07.00 kurang dari dua pertiga seluruh pemberian obat sif malam.",
        },
        {
          correct: false,
          label:
            "Banyak pemberian obat pada malam hari tidak berubah setelah jadwal baru berlaku.",
        },
      ],
    },
  },
};

export default item;
