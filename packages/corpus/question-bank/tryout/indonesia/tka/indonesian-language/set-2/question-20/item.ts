import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kecewa karena Kakek mengabaikan rangka demi tampilan baru",
        },
        {
          correct: false,
          label:
            "kagum karena Kakek menutupi setiap bekas perbaikan pada layangan",
        },
        {
          correct: false,
          label:
            "khawatir karena Kakek mementingkan cerita perbaikan dan mengabaikan hasil uji terbang",
        },
        {
          correct: true,
          label:
            "menghargai kesabaran Kakek yang menuntun Nara sampai ia menemukan makna perbaikan sendiri",
        },
        {
          correct: false,
          label:
            "kesal karena Kakek memperbaiki rangka tanpa memberi Nara kesempatan belajar",
        },
      ],
    },
  },
  stimulus: "kite-frame",
};

export default item;
