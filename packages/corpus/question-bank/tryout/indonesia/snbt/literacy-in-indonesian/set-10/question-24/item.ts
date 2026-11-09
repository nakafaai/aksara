import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "taman-siswa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "di depan memberi teladan",
        },
        {
          correct: false,
          label: "di tengah membangun semangat",
        },
        {
          correct: false,
          label: "di depan memberi perintah",
        },
        {
          correct: true,
          label: "di belakang memberi dorongan",
        },
        {
          correct: false,
          label: "di belakang memberi hukuman",
        },
      ],
    },
  },
};

export default item;
