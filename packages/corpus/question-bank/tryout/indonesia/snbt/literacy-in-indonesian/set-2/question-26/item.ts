import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "subak-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Subak di hilir lebih penting daripada subak di hulu karena menerima air terakhir.",
        },
        {
          correct: false,
          label:
            "UNESCO perlu mengambil alih pengelolaan subak dari para petani.",
        },
        {
          correct: true,
          label:
            "Gangguan di satu subak dapat merembet ke subak lain karena semuanya satu jaringan.",
        },
        {
          correct: false,
          label: "Alih fungsi sawah menjadi vila menguntungkan subak di hilir.",
        },
        {
          correct: false,
          label:
            "Anak-anak petani wajib kembali bekerja di sawah agar subak tetap hidup.",
        },
      ],
    },
  },
};

export default item;
