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
          label:
            "layangan lain menggunakan rangka yang belum pernah diperbaiki",
        },
        {
          isCorrect: true,
          label: "rangka telah pulih dan pelajaran Kakek dipahami Nara",
        },
        {
          isCorrect: false,
          label: "Nara harus membeli rangka baru",
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
