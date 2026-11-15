import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "*Sekolah Rakjat Oemoem Soedjono, Djalan Tjempaka*",
        },
        {
          correct: true,
          label: "*Sekolah Rakjat Umum Soedjono, Djalan Tjempaka*",
        },
        {
          correct: false,
          label: "*Sekolah Rakyat Umum Soedjono, Djalan Tjempaka*",
        },
        {
          correct: false,
          label: "*Sekolah Rakjat Umum Sudjono, Djalan Tjempaka*",
        },
        {
          correct: false,
          label: "*Sekolah Rakjat Umum Soedjono, Jalan Cempaka*",
        },
      ],
    },
  },
};

export default item;
