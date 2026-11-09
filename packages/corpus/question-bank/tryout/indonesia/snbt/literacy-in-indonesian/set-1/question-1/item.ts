import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "sleep-memory",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tidur dapat menggantikan sebagian jam belajar karena otak tetap mengolah informasi ketika tubuh beristirahat.",
        },
        {
          correct: true,
          label:
            "Tidur memperkuat ingatan yang sudah terbentuk saat belajar sehingga kurang tidur merugikan, baik sebelum maupun sesudah belajar.",
        },
        {
          correct: false,
          label:
            "Tidur gelombang lambat dan tidur REM sama-sama memicu pengolahan ulang ingatan yang baru dipelajari.",
        },
        {
          correct: false,
          label:
            "Begadang hanya merugikan jika dilakukan setelah belajar karena pada malam itulah konsolidasi berlangsung.",
        },
        {
          correct: false,
          label:
            "Ingatan terbentuk sepenuhnya di neokorteks saat terjaga, lalu tidur menjaganya agar tidak tertimpa informasi lain.",
        },
      ],
    },
  },
};

export default item;
