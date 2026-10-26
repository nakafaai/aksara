import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bima mempertahankan target $$18$$ kotak dengan mengirim semua muatan lebih dahulu, lalu merapikan ketidakcocokan label setelah kapal berangkat.",
        },
        {
          correct: false,
          label:
            "Bima menyerahkan keputusan tujuan kotak kepada relawan yang datang agar tanggung jawab kesalahan tidak lagi berada padanya.",
        },
        {
          correct: false,
          label:
            "Bima menahan seluruh kiriman karena hasil yang tidak lengkap tidak dapat dipertanggungjawabkan dalam keadaan apa pun.",
        },
        {
          correct: false,
          label:
            "Bima menyelesaikan masalah terutama dengan mendefinisikan akuntabilitas, sedangkan pembagian tugas hanya menjadi latar cerita.",
        },
        {
          correct: true,
          label:
            "Bima memilih mengirim $$16$$ kotak yang terverifikasi dan menahan dua kotak yang meragukan, lalu belajar bahwa kepemimpinan menuntut koordinasi dan tanggung jawab yang dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
