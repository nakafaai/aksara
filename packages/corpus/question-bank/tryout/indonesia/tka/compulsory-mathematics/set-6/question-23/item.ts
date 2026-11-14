import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "hujan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Berapa pun curah hujan Kota P pada bulan Juli, median curah hujan Kota P untuk tujuh bulan Januari sampai Juli pasti paling sedikit $$200$$ mm dan paling banyak $$240$$ mm.",
        },
        {
          column: 2,
          label:
            "Jika rata-rata curah hujan Kota Q selama enam bulan itu ditambahkan sebagai data ketujuh, median curah hujan Kota Q tidak berubah.",
        },
        {
          column: 1,
          label:
            "Jika curah hujan Kota Q pada setiap bulan turun $$40\\%$$, ada tepat $$4$$ bulan dengan curah hujan Kota P lebih tinggi daripada curah hujan Kota Q.",
        },
      ],
    },
  },
};

export default item;
