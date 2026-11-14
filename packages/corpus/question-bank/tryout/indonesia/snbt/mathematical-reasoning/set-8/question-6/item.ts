import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ticket-quota",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika seluruh $$1{.}000$$ tiket terjual, rata-rata harga satu tiket menurut tahapnya lebih dari $$\\text{Rp}170{.}000$$.",
        },
        {
          column: 2,
          label:
            "Rata-rata harga $$450$$ tiket pertama menurut tahapnya kurang dari $$\\text{Rp}140{.}000$$.",
        },
        {
          column: 1,
          label:
            "Ada transaksi berisi $$4$$ tiket yang total bayarnya, termasuk biaya layanan, kurang dari $$\\text{Rp}450{.}000$$.",
        },
        {
          column: 1,
          label:
            "Pembeli tiket nomor $$449$$ sampai $$452$$ dalam satu transaksi membayar lebih dari $$\\text{Rp}630{.}000$$, termasuk biaya layanan.",
        },
      ],
    },
  },
};

export default item;
