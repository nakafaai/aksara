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
            "Peminjam yang gagal bayar di kota itu kebanyakan berpenghasilan rendah dan tidak tetap.",
        },
        {
          correct: false,
          label:
            "Jumlah aplikasi pinjaman daring yang beroperasi di kota itu bertambah dua kali lipat dalam setahun terakhir.",
        },
        {
          correct: false,
          label:
            "Sebagian peminjam yang gagal bayar mengaku meminjam untuk membayar pinjaman lain.",
        },
        {
          correct: false,
          label:
            "Banyak warga kota itu tidak pernah mendapat pelajaran tentang bunga di sekolah.",
        },
        {
          correct: true,
          label:
            "Di antara peminjam yang lancar membayar, dua pertiga juga tidak dapat menjawab soal bunga yang sama.",
        },
      ],
    },
  },
};

export default item;
