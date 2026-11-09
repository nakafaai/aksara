import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "grain-barn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menyatakan pertentangan dengan kalimat sebelumnya",
        },
        {
          correct: false,
          label: "menambahkan contoh bagi kalimat sebelumnya",
        },
        {
          correct: true,
          label: "menyatakan simpulan dari alasan pada kalimat sebelumnya",
        },
        {
          correct: false,
          label: "menyatakan urutan waktu setelah kalimat sebelumnya",
        },
        {
          correct: false,
          label: "menyatakan syarat bagi kalimat sebelumnya",
        },
      ],
    },
  },
};

export default item;
