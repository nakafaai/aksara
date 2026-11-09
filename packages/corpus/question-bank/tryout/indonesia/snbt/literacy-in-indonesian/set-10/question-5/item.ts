import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "coral-bleaching",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa terumbu karang menutupi sebagian besar dasar laut",
        },
        {
          correct: false,
          label:
            "menjelaskan cara alga melakukan fotosintesis di dalam jaringan tubuh karang",
        },
        {
          correct: true,
          label:
            "menunjukkan pentingnya terumbu yang kecil luasnya tetapi kaya kehidupan",
        },
        {
          correct: false,
          label:
            "menyarankan agar penyelam tidak lagi mengunjungi terumbu karang",
        },
        {
          correct: false,
          label: "membandingkan karang dengan tumbuhan yang hidup di daratan",
        },
      ],
    },
  },
};

export default item;
