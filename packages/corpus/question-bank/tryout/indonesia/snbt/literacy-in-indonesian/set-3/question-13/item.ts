import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar peminjam yang gagal bayar mengaku meminjam untuk menutup pinjaman di aplikasi lain.",
        },
        {
          correct: false,
          label:
            "Survei serupa di kota lain juga menemukan bahwa dua pertiga peminjam yang gagal bayar tidak dapat menjawab soal bunga.",
        },
        {
          correct: false,
          label:
            "Survei diulang terhadap $$3{.}000$$ peminjam yang gagal bayar, dan hasilnya tetap dua pertiga tidak dapat menjawab soal bunga.",
        },
        {
          correct: false,
          label:
            "Aplikasi Kilat kini menampilkan seluruh biaya pinjaman di satu halaman sebelum peminjam menyetujuinya.",
        },
        {
          correct: true,
          label:
            "Di antara peminjam yang lancar membayar, hanya sepersepuluh yang tidak dapat menjawab soal bunga yang sama.",
        },
      ],
    },
  },
};

export default item;
