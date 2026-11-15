import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebuah toko menampilkan harga coret di samping harga diskon, karena pembeli lebih tertarik membeli ketika melihat selisih harga yang besar.",
        },
        {
          correct: false,
          label:
            "Sebuah sekolah membiarkan siswa memilih kegiatan ekstrakurikuler sendiri, karena kebebasan memilih dianggap paling penting.",
        },
        {
          correct: false,
          label:
            "Pemerintah mewajibkan pengendara memakai helm, karena keselamatan dianggap lebih penting daripada kebebasan memilih.",
        },
        {
          correct: false,
          label:
            "Seorang dokter menuliskan dosis bawaan pada resep, karena banyak pasien malas membaca petunjuk pemakaian obat.",
        },
        {
          correct: true,
          label:
            "Seorang guru berkata bahwa tidak memberi pekerjaan rumah pun sudah sebuah keputusan, jadi yang perlu dibahas adalah pekerjaan rumah seperti apa.",
        },
      ],
    },
  },
};

export default item;
