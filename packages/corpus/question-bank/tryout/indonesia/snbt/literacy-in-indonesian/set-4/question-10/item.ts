import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nia keberatan karena tidak dilibatkan dalam rencana yang sudah disiapkan Bu Warsih.",
        },
        {
          correct: false,
          label:
            "Bu Warsih menolak memberi tahu Nia rencananya pada kesempatan berikutnya.",
        },
        {
          correct: true,
          label:
            "Bu Warsih ingin Nia kelak juga meyakinkan keluarga pasien, bukan hanya mengukur keadaan pasien.",
        },
        {
          correct: false,
          label:
            "Nia menyesal karena telah mendesak Bu Warsih agar Sumi segera dirujuk.",
        },
        {
          correct: false,
          label:
            "Bu Warsih menganggap alat ukur tidak sepenting kemampuan bercerita dalam merujuk pasien.",
        },
      ],
    },
  },
};

export default item;
