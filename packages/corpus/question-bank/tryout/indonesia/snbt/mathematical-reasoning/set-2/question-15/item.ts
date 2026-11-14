import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "service-counters",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sampai tepat pukul 09.00, banyak orang yang sudah selesai dilayani di Loket A sama dengan $$1{,}5$$ kali banyak orang yang sudah selesai dilayani di Loket B.",
        },
        {
          column: 2,
          label:
            "Rata-rata waktu tunggu orang nomor $$1$$ sampai $$10$$ adalah $$10$$ menit.",
        },
        {
          column: 2,
          label:
            "Orang nomor $$30$$ selesai dilayani lebih awal daripada orang nomor $$29$$.",
        },
        {
          column: 2,
          label:
            "Jika Loket B melayani setiap orang dalam $$5$$ menit, waktu tunggu orang nomor $$11$$ kurang dari $$15$$ menit.",
        },
      ],
    },
  },
};

export default item;
