import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "store-promo",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bagi pemegang kartu anggota, kedua diskon sama dengan satu diskon sebesar $$28\\,\\%$$ dari harga barang.",
        },
        {
          column: 2,
          label:
            "Pembeli yang bukan pemegang kartu anggota dan membeli barang seharga $$\\text{Rp}240{.}000$$ mendapat gratis ongkos kirim.",
        },
        {
          column: 1,
          label:
            "Jika diskon $$10\\,\\%$$ diberikan lebih dulu, lalu diskon $$20\\,\\%$$ dari harga baru, harga akhirnya sama dengan urutan promo.",
        },
        {
          column: 2,
          label:
            "Pemegang kartu anggota yang membeli barang seharga $$\\text{Rp}270{.}000$$ mendapat gratis ongkos kirim.",
        },
      ],
    },
  },
};

export default item;
