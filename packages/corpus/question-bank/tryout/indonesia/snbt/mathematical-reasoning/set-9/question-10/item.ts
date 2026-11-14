import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pension-savings",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pegawai yang menyetor $$\\text{Rp}20{.}000{.}000{,}00$$ pada awal tahun ke-$$1$$, ke-$$3$$, dan ke-$$5$$ memiliki saldo akhir tahun ke-$$6$$ yang sama dengan pegawai yang menyetor $$\\text{Rp}10{.}000{.}000{,}00$$ setiap awal tahun selama $$6$$ tahun.",
        },
        {
          column: 2,
          label:
            "Jika setoran setiap awal tahun dinaikkan dari $$\\text{Rp}6{.}000{.}000{,}00$$ menjadi $$\\text{Rp}12{.}000{.}000{,}00$$, saldo akhir tahun ke-$$5$$ menjadi tepat dua kali lipat.",
        },
        {
          column: 1,
          label:
            "Untuk setoran yang sama besar setiap awal tahun, saldo akhir tahun ke-$$10$$ lebih dari $$2{,}5$$ kali saldo akhir tahun ke-$$5$$.",
        },
        {
          column: 2,
          label:
            "Dana yang masuk pada awal tahun ke-$$1$$, yaitu setoran ditambah dana pendamping, sudah menjadi lebih dari dua kali lipat pada akhir tahun ke-$$7$$.",
        },
      ],
    },
  },
};

export default item;
