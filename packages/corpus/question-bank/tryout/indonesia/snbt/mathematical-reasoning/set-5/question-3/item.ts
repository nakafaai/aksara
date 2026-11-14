import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "gym-plans",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bagi member lama, biaya termurah untuk masuk setiap hari selama $$40$$ hari berturut-turut adalah $$\\text{Rp}600{.}000$$.",
        },
        {
          column: 2,
          label:
            "Bagi orang yang belum pernah menjadi member, biaya termurah untuk masuk $$20$$ kali dalam $$40$$ hari pasti tidak kurang dari $$\\text{Rp}500{.}000$$.",
        },
        {
          column: 1,
          label:
            "Orang yang datang tepat $$3$$ kali setiap minggu, selalu pada $$3$$ hari yang sama, dan membeli kartu baru hanya setelah jatah kartu sebelumnya habis tidak pernah kehilangan jatah kartu.",
        },
        {
          column: 1,
          label:
            "Ada $$2$$ hari tetap dalam seminggu yang membuat orang yang datang pada kedua hari itu setiap minggu selama $$10$$ minggu cukup membayar seluruh $$20$$ kunjungannya dengan $$2$$ kartu $$10$$ kali.",
        },
      ],
    },
  },
};

export default item;
