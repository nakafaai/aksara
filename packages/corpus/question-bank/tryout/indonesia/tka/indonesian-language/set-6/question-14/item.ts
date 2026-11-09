import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "eye-screening",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "semua orang tua menolak membelikan kacamata untuk anaknya",
        },
        {
          correct: true,
          label:
            "ada beberapa alasan mengapa siswa yang membutuhkan kacamata belum memakainya",
        },
        { correct: false, label: "kacamata selalu membuat siswa diejek teman" },
        { correct: false, label: "dokter keliru memeriksa mata para siswa" },
        {
          correct: false,
          label: "siswa berkacamata sebaiknya duduk di barisan belakang",
        },
      ],
    },
  },
};

export default item;
