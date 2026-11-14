import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parcel-weight",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Memperkecil ukuran kardus selalu menurunkan biaya pengiriman.",
        },
        {
          column: 1,
          label:
            "Buku dalam kardus berukuran 20 cm × 15 cm × 5 cm dengan berat aktual 2,3 kg ditagih sebagai 3 kg.",
        },
        {
          column: 1,
          label:
            "Kardus berukuran 60 cm × 50 cm × 40 cm berisi barang seberat 8 kg ditagih sebagai 20 kg.",
        },
        {
          column: 2,
          label:
            "Berat volume kardus berbentuk kubus dengan panjang rusuk 30 cm adalah 5 kg.",
        },
      ],
    },
  },
};

export default item;
