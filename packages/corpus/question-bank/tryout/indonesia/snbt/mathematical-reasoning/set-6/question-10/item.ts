import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "night-bus",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Di antara penumpang bus A yang dapat melanjutkan perjalanan dengan bus B, waktu tunggu terlama di Halte Pasar adalah $$27\\text{ menit}$$.",
        },
        {
          column: 2,
          label:
            "Dua keberangkatan bus A yang berselang $$90\\text{ menit}$$ selalu memberi penumpangnya waktu tunggu yang sama di Halte Pasar.",
        },
        {
          column: 2,
          label:
            "Penumpang bus A yang berangkat lebih awal selalu tiba di Halte Kampus lebih awal daripada penumpang bus A berikutnya.",
        },
        {
          column: 1,
          label:
            "Jika bus B diubah menjadi berangkat setiap $$18\\text{ menit}$$ mulai pukul 21.22 tanpa keberangkatan setelah pukul 23.52, setiap penumpang bus A yang masih dapat naik bus B memperoleh transfer gratis.",
        },
      ],
    },
  },
};

export default item;
