import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kakek meminta lomba segera dihentikan",
        },
        {
          isCorrect: false,
          label: "semua layangan lain telah robek",
        },
        {
          isCorrect: false,
          label: "Nara harus membeli rangka baru",
        },
        {
          isCorrect: true,
          label: "rangka telah pulih dan pelajaran Kakek dipahami Nara",
        },
        {
          isCorrect: false,
          label: "juri memilih hiasan paling indah",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
