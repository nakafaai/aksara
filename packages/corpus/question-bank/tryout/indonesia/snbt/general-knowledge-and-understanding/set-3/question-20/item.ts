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
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagian SHU anggota yang selalu membayar tepat waktu dapat mengecil karena pinjaman anggota lain macet.",
        },
        {
          correct: false,
          label:
            "Bunga yang dibayarkan kepada anggota atas simpanan sukarela merupakan bagian dari biaya koperasi.",
        },
        {
          correct: false,
          label:
            "Anggota yang menyimpan kembali bagian SHU-nya ikut menambah dana yang dapat dipinjamkan kepada anggota yang membutuhkan.",
        },
        {
          correct: true,
          label:
            "Simpanan wajib seorang anggota ikut tumbuh dengan bunga majemuk karena simpanan itu tidak pernah diambil selama ia menjadi anggota.",
        },
        {
          correct: false,
          label:
            "Pendapatan koperasi dapat turun walaupun jumlah anggota yang meminjam tidak berkurang.",
        },
      ],
    },
  },
};

export default item;
