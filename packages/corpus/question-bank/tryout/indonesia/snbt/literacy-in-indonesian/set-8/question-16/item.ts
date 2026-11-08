import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "breakfast-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sarapan setiap hari pasti menaikkan nilai kuis matematika setiap siswa.",
        },
        {
          correct: false,
          label:
            "Siswa yang jarang sarapan pada dasarnya kurang pandai daripada siswa yang sering sarapan.",
        },
        {
          correct: false,
          label:
            "Tidur yang singkat adalah satu-satunya penyebab nilai kuis yang rendah.",
        },
        {
          correct: false,
          label:
            "Kuis matematika itu mungkin terlalu sulit bagi seluruh siswa kelas X.",
        },
        {
          correct: true,
          label:
            "Yang sering sarapan bernilai lebih tinggi, tetapi sarapan belum terbukti penyebabnya.",
        },
      ],
    },
  },
};

export default item;
