import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebuah kota mengganti seluruh papan nama jalan dengan nama-nama baru, sehingga warga perlu waktu lama untuk menemukan alamat yang mereka kenal.",
        },
        {
          correct: false,
          label:
            "Sebuah sekolah menghapus pelajaran menulis tegak bersambung, sehingga siswa tidak lagi mampu membaca surat tulisan tangan kakek mereka.",
        },
        {
          correct: false,
          label:
            "Sebuah penerbit mencetak ulang semua novel lamanya dengan sampul baru yang lebih mahal, sehingga pembaca muda lebih tertarik membelinya.",
        },
        {
          correct: true,
          label:
            "Sebuah kota mengganti bentuk huruf semua rambu jalan dengan biaya besar, tetapi pengemudi tetap memahami rambu lama karena kata-katanya sama.",
        },
        {
          correct: false,
          label:
            "Sebuah kantor beralih dari arsip kertas ke arsip digital dengan biaya besar, sehingga dokumen lama yang tidak dipindai menjadi sulit ditemukan.",
        },
      ],
    },
  },
};

export default item;
