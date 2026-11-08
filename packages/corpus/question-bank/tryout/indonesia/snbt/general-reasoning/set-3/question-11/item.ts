import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Toni tidak bekerja dari rumah.",
        },
        {
          column: 1,
          label: "Toni tidak mengikuti rapat daring pukul $$09.00$$.",
        },
        {
          column: 2,
          label:
            "Semua pegawai bagian pemasaran melakukan kunjungan klien pada pagi hari.",
        },
        {
          column: 1,
          label:
            "Sebagian pegawai bagian pemasaran tidak melakukan kunjungan klien pada pagi hari.",
        },
        {
          column: 2,
          label:
            "Pegawai yang tidak bekerja dari rumah tidak mengikuti rapat daring pukul $$09.00$$.",
        },
      ],
    },
  },
};

export default item;
