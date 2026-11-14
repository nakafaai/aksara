import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bike-share",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika urutan kedelapan perjalanan Dita pada bulan November dibalik, jumlah biaya menit yang ia bayar dengan paket langganan tetap sama.",
        },
        {
          column: 1,
          label:
            "Dengan paket langganan, batas biaya menit Dita pada bulan November baru tercapai pada perjalanan terakhirnya.",
        },
        {
          column: 2,
          label:
            "Jika perjalanan pertama Dita diganti dengan dua perjalanan berurutan berdurasi $$13\\text{ menit}$$ dan $$12\\text{ menit}$$, total biaya paket langganan Dita pada bulan November menjadi lebih kecil.",
        },
        {
          column: 1,
          label:
            "Setiap pengguna yang dalam satu bulan kalender melakukan paling banyak $$4$$ perjalanan, masing-masing paling lama $$20\\text{ menit}$$, membayar lebih murah dengan tarif reguler daripada dengan paket langganan.",
        },
      ],
    },
  },
};

export default item;
