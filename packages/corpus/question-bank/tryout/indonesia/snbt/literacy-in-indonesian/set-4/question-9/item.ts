import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "free-transit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengendara mobil tidak pernah mau naik bus dalam keadaan apa pun.",
        },
        {
          correct: false,
          label: "Harga bahan bakar bus akan turun jika tiket dihapus.",
        },
        {
          correct: false,
          label:
            "Semua warga berpenghasilan rendah sudah memiliki kendaraan pribadi.",
        },
        {
          correct: false,
          label:
            "Sopir bus bersedia bekerja tanpa dibayar jika tiket digratiskan.",
        },
        {
          correct: true,
          label:
            "Pendapatan tiket yang hilang tidak sepenuhnya digantikan dana lain.",
        },
      ],
    },
  },
};

export default item;
