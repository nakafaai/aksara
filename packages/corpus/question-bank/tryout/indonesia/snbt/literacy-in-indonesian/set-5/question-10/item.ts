import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "point-of-view",
  },
  stimulus: "ferry-mechanic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "mengetahui isi pikiran Darto dan Kepala Kamar Mesin sejelas isi pikiran Pak Wiryo",
        },
        {
          correct: false,
          label:
            "memercayai penilaian Pak Wiryo tentang dirinya karena hanya dialah yang bercerita",
        },
        {
          correct: false,
          label:
            "memihak Darto karena Pak Wiryo ditampilkan sebagai orang tua yang sombong dan keras kepala",
        },
        {
          correct: true,
          label:
            "melihat jarak antara penjelasan Pak Wiryo tentang dirinya dan hal yang diperlihatkan oleh tindakan serta ucapan orang di sekitarnya",
        },
        {
          correct: false,
          label:
            "memahami bahwa pendengaran seorang montir lebih dapat diandalkan daripada alat ukur",
        },
      ],
    },
  },
};

export default item;
