import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "dice-game",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Peluang jumlah kedua mata dadu sama dengan 11 adalah $$\\dfrac{1}{18}$$.",
        },
        {
          column: 1,
          label:
            "Dalam jangka panjang, penyelenggara memperoleh rata-rata $$\\text{Rp}1{.}500{,}00$$ dari setiap permainan.",
        },
        {
          column: 2,
          label:
            "Jika permainan dimainkan 360 kali, banyak kejadian jumlah mata dadu 12 yang diharapkan adalah 20 kali.",
        },
        {
          column: 2,
          label:
            "Jika semua hadiah dinaikkan menjadi dua kali lipat, permainan tetap menguntungkan penyelenggara dalam jangka panjang.",
        },
      ],
    },
  },
};

export default item;
