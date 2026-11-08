import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "tempe-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa tempe pertama kali dibuat dengan kedelai impor",
        },
        {
          correct: true,
          label: "menunjukkan bahwa tempe sudah dikenal di Jawa sejak lama",
        },
        {
          correct: false,
          label:
            "menjelaskan cara membuat tempe yang paling tepat menurut leluhur",
        },
        {
          correct: false,
          label:
            "membandingkan tempe di Jawa dengan tempe di negara-negara lain",
        },
        {
          correct: false,
          label: "menyarankan agar pembaca membaca karya sastra Jawa tersebut",
        },
      ],
    },
  },
};

export default item;
