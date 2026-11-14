import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-canteen",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Hari dengan porsi terjual paling banyak juga merupakan hari dengan laba kotor paling besar.",
        },
        {
          column: 2,
          label:
            "Menu yang paling banyak terjual dalam minggu itu juga menyumbang laba kotor mingguan paling besar.",
        },
        {
          column: 1,
          label:
            "Laba kotor hari Senin lebih dari $$70\\%$$ lebih besar daripada laba kotor hari Rabu.",
        },
        {
          column: 2,
          label:
            "Jika harga jual es jeruk naik $$\\text{Rp}1{.}000{,}00$$ per porsi dan banyak porsi setiap menu tetap, laba bersih mingguan naik lebih dari $$40\\%$$.",
        },
      ],
    },
  },
};

export default item;
