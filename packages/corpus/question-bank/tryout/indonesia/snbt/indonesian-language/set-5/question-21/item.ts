import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bima mempertahankan target 18 kotak dengan mengirim semua muatan lebih dahulu, lalu merapikan ketidakcocokan label setelah kapal berangkat.",
        },
        {
          isCorrect: false,
          label:
            "Bima menyerahkan keputusan tujuan kotak kepada relawan yang datang agar tanggung jawab kesalahan tidak lagi berada padanya.",
        },
        {
          isCorrect: false,
          label:
            "Bima menahan seluruh kiriman karena hasil yang tidak lengkap tidak dapat dipertanggungjawabkan dalam keadaan apa pun.",
        },
        {
          isCorrect: false,
          label:
            "Bima menyelesaikan masalah terutama dengan mendefinisikan akuntabilitas, sedangkan pembagian tugas hanya menjadi latar cerita.",
        },
        {
          isCorrect: true,
          label:
            "Bima memilih mengirim 16 kotak yang terverifikasi dan menahan dua kotak yang meragukan, lalu belajar bahwa kepemimpinan menuntut koordinasi dan tanggung jawab yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
