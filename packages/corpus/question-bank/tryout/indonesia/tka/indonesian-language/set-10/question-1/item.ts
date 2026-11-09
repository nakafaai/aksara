import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "butterfly-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kupu-kupu tidak menyukai bunga yang berwarna-warni",
        },
        {
          correct: false,
          label: "guru IPA melarang siswa menanam bunga di taman",
        },
        {
          correct: true,
          label:
            "taman yang hanya berisi bunga belum cukup karena kupu-kupu membutuhkan tumbuhan inang untuk berkembang biak",
        },
        {
          correct: false,
          label: "kupu-kupu dewasa memakan daun jeruk dan kemuning",
        },
        {
          correct: false,
          label: "taman kupu-kupu itu seluas dua kali lapangan voli",
        },
      ],
    },
  },
};

export default item;
