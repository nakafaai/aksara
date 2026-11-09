import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "money-changer",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika dihitung sebagai persentase dari kurs jualnya, selisih kurs jual dan kurs beli dolar Singapura lebih kecil daripada selisih kurs ringgit.",
        },
        {
          column: 2,
          label:
            "Seseorang yang menjual $$1$$ dolar Singapura ke tempat itu, lalu memakai seluruh rupiahnya untuk membeli ringgit, memperoleh lebih dari $$3{,}5$$ ringgit.",
        },
        {
          column: 1,
          label:
            "Menukar $$\\text{Rp}12{.}000{.}000$$ menjadi dolar Singapura, lalu langsung menjual kembali seluruh dolar itu, membuat pelanggan rugi $$\\text{Rp}200{.}000$$.",
        },
        {
          column: 2,
          label:
            "Jika kurs jual ringgit naik $$4\\,\\%$$, kurs jual ringgit menjadi lebih dari $$\\text{Rp}3{.}650$$.",
        },
      ],
    },
  },
};

export default item;
