import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fish-pond",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Di antara bulan kedua sampai bulan keenam, bulan dengan pertambahan biomassa terbesar sama dengan bulan dengan pertambahan bobot rata-rata per ekor terbesar.",
        },
        {
          column: 2,
          label:
            "Banyak ikan yang mati selama bulan keenam kurang dari separuh banyak ikan yang mati selama bulan kelima.",
        },
        {
          column: 1,
          label:
            "Jika seluruh ikan dijual sebagai satu kelompok, pendapatan pada akhir bulan keempat lebih dari $$1{,}5$$ kali pendapatan pada akhir bulan ketiga.",
        },
        {
          column: 2,
          label:
            "Biomassa pada akhir bulan keenam lebih dari $$2{,}5$$ kali biomassa pada akhir bulan kedua.",
        },
      ],
    },
  },
};

export default item;
