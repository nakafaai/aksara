import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "recycling-bank",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menyetor $$2{,}8\\text{ kg}$$ kaleng dalam $$2$$ kali setor, masing-masing $$1{,}4\\text{ kg}$$, menambah saldo lebih sedikit daripada menyetor kaleng itu sekaligus.",
        },
        {
          column: 2,
          label:
            "Biaya pengelolaan untuk satu setoran gabungan selalu sama dengan jumlah biaya pengelolaan jika barang yang sama disetor dalam $$2$$ kali setor.",
        },
        {
          column: 2,
          label:
            "Nilai kardus basah selalu tepat $$80\\%$$ dari nilai kardus kering yang beratnya sama.",
        },
        {
          column: 2,
          label:
            "Tambahan saldo dari satu kali setor tidak pernah lebih dari $$90\\%$$ nilai setoran itu.",
        },
      ],
    },
  },
};

export default item;
