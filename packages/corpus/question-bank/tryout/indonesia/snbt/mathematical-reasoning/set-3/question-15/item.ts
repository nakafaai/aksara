import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "floor-tiles",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Biaya pembelian ubin sesuai saran tukang dengan jumlah dus paling sedikit adalah $$\\text{Rp}1{.}632{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Lantai yang sama juga dapat ditutup ubin persegi berukuran $$40\\text{ cm}\\times40\\text{ cm}$$ tanpa memotong ubin.",
        },
        {
          column: 1,
          label:
            "Jika dibeli dus dengan jumlah paling sedikit sesuai saran tukang, setelah lantai selesai dipasang tersisa 24 ubin, dengan anggapan tidak ada ubin yang pecah.",
        },
        {
          column: 2,
          label:
            "Tanpa cadangan, banyak dus paling sedikit yang diperlukan adalah 16 dus.",
        },
      ],
    },
  },
};

export default item;
