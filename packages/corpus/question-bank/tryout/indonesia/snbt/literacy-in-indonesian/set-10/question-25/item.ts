import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "taman-siswa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menolaknya sepenuhnya karena gagasan itu berasal dari bangsa penjajah",
        },
        {
          correct: false,
          label:
            "menganggapnya lebih unggul daripada semua gagasan dari bangsanya sendiri",
        },
        {
          correct: false,
          label:
            "menilainya hanya cocok untuk anak-anak keturunan Eropa di Hindia Belanda",
        },
        {
          correct: false,
          label:
            "baru mempelajarinya setelah Taman Siswa membuka cabang di banyak kota",
        },
        {
          correct: true,
          label:
            "mempelajarinya, tetapi tetap mendasarkan pendidikan pada budaya sendiri",
        },
      ],
    },
  },
};

export default item;
