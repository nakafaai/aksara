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
          label: "*Goeroe itu mengadjar anak-anak rakjat jang makmur.*",
        },
        {
          correct: true,
          label: "*Guru itu mengadjar anak-anak rakjat jang makmur.*",
        },
        {
          correct: false,
          label: "*Guru itu mengajar anak-anak rakjat jang makmur.*",
        },
        {
          correct: false,
          label: "*Guru itu mengadjar anak-anak rakyat yang makmur.*",
        },
        {
          correct: false,
          label: "*Guru itu mengadjar anak-anak ra'jat jang ma'moer.*",
        },
      ],
    },
  },
};

export default item;
