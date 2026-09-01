import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kecewa karena Kakek mengabaikan rangka demi tampilan baru",
        },
        {
          isCorrect: false,
          label:
            "kagum karena Kakek menutupi setiap bekas perbaikan pada layangan",
        },
        {
          isCorrect: false,
          label:
            "khawatir karena Kakek mementingkan cerita perbaikan dan mengabaikan hasil uji terbang",
        },
        {
          isCorrect: true,
          label:
            "menghargai kesabaran Kakek yang menuntun Nara sampai ia menemukan makna perbaikan sendiri",
        },
        {
          isCorrect: false,
          label:
            "kesal karena Kakek memperbaiki rangka tanpa memberi Nara kesempatan belajar",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
