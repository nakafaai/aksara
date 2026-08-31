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
          label:
            "mendorong Nara mengganti layangan lama dengan yang tampilannya lebih rapi",
        },
        {
          isCorrect: false,
          label:
            "lebih menghargai penampilan layangan daripada proses pengujian rangkanya",
        },
        {
          isCorrect: false,
          label:
            "mengutamakan cerita proses perbaikan dibanding hasil uji terbang",
        },
        {
          isCorrect: true,
          label:
            "menghargai proses dan membiarkan Nara menemukan maknanya sendiri",
        },
        {
          isCorrect: false,
          label:
            "memperbaiki rangka untuk Nara tanpa menjelaskan alasan setiap langkah",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
