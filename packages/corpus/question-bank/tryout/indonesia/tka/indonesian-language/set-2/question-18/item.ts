import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "kite-frame",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kakek meminta lomba segera dihentikan",
        },
        {
          correct: false,
          label:
            "layangan lain menggunakan rangka yang belum pernah diperbaiki",
        },
        {
          correct: true,
          label: "rangka telah pulih dan pelajaran Kakek dipahami Nara",
        },
        {
          correct: false,
          label: "Nara harus membeli rangka baru",
        },
        {
          correct: false,
          label: "juri memilih hiasan paling indah",
        },
      ],
    },
  },
};

export default item;
