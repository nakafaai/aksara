import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "koperasi",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Anggota yang tidak pernah meminjam tetap dapat memperoleh bagian SHU.",
        },
        {
          column: 1,
          label:
            "Jika seorang anggota mengambil bunga simpanan sukarelanya setiap bulan dan tidak menambah setoran, bunga yang ia terima tiap bulan dihitung dari jumlah yang sama, seperti pada bunga tunggal.",
        },
        {
          column: 2,
          label:
            "Pada akhir bulan ketiga, selisih saldo antara bunga majemuk dan bunga tunggal untuk setoran $$\\text{Rp}1{.}000{.}000$$ dengan bunga $$1\\%$$ per bulan tepat $$\\text{Rp}300$$.",
        },
        {
          column: 2,
          label:
            "Bunga majemuk membuat setiap setoran berlipat dua dalam sekitar $$70$$ bulan, berapa pun besar bunganya.",
        },
      ],
    },
  },
};

export default item;
