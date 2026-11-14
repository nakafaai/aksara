import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "koperasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Memberi contoh lain bunga majemuk pada saldo simpanan sukarela seorang anggota, seperti contoh pada paragraf kedua.",
        },
        {
          correct: false,
          label:
            "Membantah paragraf kedua dengan menunjukkan bahwa bunga majemuk justru dapat merugikan koperasi.",
        },
        {
          correct: false,
          label:
            "Mengalihkan pembahasan ke pinjaman macet sebagai masalah utama yang mengancam pembagian SHU.",
        },
        {
          correct: false,
          label:
            "Menerapkan logika bunga majemuk pada koperasi untuk menunjukkan bahwa SHU yang disimpan kembali dengan sendirinya akan terus berlipat.",
        },
        {
          correct: true,
          label:
            "Menggabungkan pembagian SHU dari paragraf pertama dengan logika bunga majemuk dari paragraf kedua pada tingkat koperasi, lalu menetapkan syarat agar putaran itu berjalan.",
        },
      ],
    },
  },
};

export default item;
