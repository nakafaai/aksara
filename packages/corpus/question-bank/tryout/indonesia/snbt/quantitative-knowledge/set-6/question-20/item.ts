import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Rata-rata banyak sepeda yang disewa per minggu di Taman Kota lebih besar daripada di Pantai.",
        },
        {
          column: 1,
          label:
            "Jumlah sepeda yang disewa di kedua lokasi paling banyak terjadi pada minggu keempat.",
        },
        {
          column: 2,
          label:
            "Banyak sepeda yang disewa di Taman Kota turun $$24\\%$$ dari minggu kedua ke minggu ketiga.",
        },
        {
          column: 1,
          label:
            "Pada minggu ketiga, banyak sepeda yang disewa di Pantai $$1{,}5$$ kali banyak sepeda yang disewa di Taman Kota.",
        },
      ],
    },
  },
};

export default item;
