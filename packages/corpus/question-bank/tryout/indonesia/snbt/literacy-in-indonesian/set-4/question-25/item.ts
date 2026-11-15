import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data penjualan yang menunjukkan bahwa novel Siti Nurbaya dicetak ulang berkali-kali pada masa kolonial.",
        },
        {
          correct: false,
          label:
            "Daftar naskah yang ditolak Balai Pustaka karena dinilai memuat kritik terhadap pemerintah kolonial.",
        },
        {
          correct: false,
          label:
            "Catatan bahwa sebagian besar pegawai Balai Pustaka adalah penulis dan penerjemah pribumi.",
        },
        {
          correct: true,
          label:
            "Surat pejabat kolonial yang menyebut perluasan Taman Pustaka sebagai cara menekan peredaran bacaan liar.",
        },
        {
          correct: false,
          label:
            "Laporan bahwa bacaan liar tetap beredar luas walaupun buku Balai Pustaka dijual dengan harga murah.",
        },
      ],
    },
  },
};

export default item;
