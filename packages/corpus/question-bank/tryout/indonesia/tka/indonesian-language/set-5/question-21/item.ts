import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "turtle-nest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pemindahan telur harus mengikuti aturan waktu, posisi, dan kedalaman agar embrio tetap hidup",
        },
        {
          correct: false,
          label:
            "relawan berpatroli dari pukul sembilan malam sampai pukul tiga pagi",
        },
        {
          correct: false,
          label: "anjing liar sering menggali sarang penyu di pantai terbuka",
        },
        {
          correct: false,
          label: "telur sebaiknya diputar agar embrio berkembang merata",
        },
        { correct: false, label: "suhu pasir menentukan jenis kelamin tukik" },
      ],
    },
  },
};

export default item;
