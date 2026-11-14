import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "gudang",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Ada akhir minggu ketika stok dua gudang tepat sama besar dan pada saat itu stok ketiga gudang tidak ada yang kurang dari stok aman.",
        },
        {
          column: 2,
          label:
            "Jika sejak minggu pertama Gudang Cempaka mengambil alih pengiriman $$4$$ ton beras per minggu dari Gudang Anggrek, tidak ada gudang yang stoknya kurang dari stok aman sampai akhir minggu ke-$$8$$.",
        },
        {
          column: 2,
          label:
            "Pada akhir minggu ke-$$8$$, jika susut mingguan dibandingkan dengan stok gudang pada saat itu, persentase susut Gudang Cempaka lebih besar daripada persentase susut Gudang Anggrek.",
        },
        {
          column: 1,
          label:
            "Setiap minggu, susut ketiga gudang menyumbang lebih dari $$10\\%$$ penurunan jumlah stok ketiga gudang.",
        },
      ],
    },
  },
};

export default item;
