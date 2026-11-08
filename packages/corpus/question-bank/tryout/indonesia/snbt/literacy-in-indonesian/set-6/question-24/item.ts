import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "sriwijaya-stones",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Prasasti itu memuat daftar kata bahasa Indonesia yang pertama.",
        },
        {
          correct: true,
          label:
            "Prasasti itu termasuk bukti tertulis tertua tentang bahasa Melayu.",
        },
        {
          correct: false,
          label: "Prasasti itu ditulis oleh I-Tsing dalam bahasa Melayu Kuno.",
        },
        {
          correct: false,
          label:
            "Prasasti itu membuktikan bahwa aksara Pallawa berasal dari Sumatra.",
        },
        {
          correct: false,
          label:
            "Prasasti itu mungkin ditulis dalam bahasa Indonesia yang sudah baku.",
        },
      ],
    },
  },
};

export default item;
