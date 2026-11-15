import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Pada Februari, teri menyumbang lebih dari separuh nilai lelang total." },
        { column: 1, label: "Harga rata-rata seluruh ikan turun walaupun harga setiap jenis ikan naik." },
        { column: 1, label: "Nilai lelang tongkol pada Februari kurang dari nilainya pada Januari." },
        { column: 1, label: "Berat kembung yang terjual tidak berubah, tetapi nilai lelangnya naik." },
      ],
    },
  },
};

export default item;
