import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pool-pumps",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pompa A bekerja 1,5 kali lebih cepat daripada pompa B.",
        },
        {
          column: 1,
          label:
            "Laju saluran pembuangan mengosongkan kolam sama dengan setengah laju pompa B mengisi kolam.",
        },
        {
          column: 2,
          label:
            "Jika pompa A diganti pompa yang dua kali lebih cepat, waktu mengisi kolam kosong bersama pompa B menjadi setengah dari waktu semula.",
        },
        {
          column: 2,
          label:
            "Waktu mengisi kolam kosong dengan kedua pompa bersamaan sama dengan setengah rata-rata waktu kedua pompa jika bekerja sendiri.",
        },
      ],
    },
  },
};

export default item;
