import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "breakfast-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengulang survei yang sama persis kepada 400 siswa kelas X pada tahun ajaran berikutnya.",
        },
        {
          correct: false,
          label:
            "Bertanya kepada siswa apakah mereka merasa lebih pintar setelah sarapan.",
        },
        {
          correct: false,
          label:
            "Membandingkan nilai kuis siswa kelas X dengan nilai siswa kelas XII.",
        },
        {
          correct: true,
          label:
            "Memberi sarapan di sekolah kepada kelas yang dipilih acak, lalu membandingkan nilai.",
        },
        {
          correct: false,
          label:
            "Menambah jumlah kuis matematika menjadi tiga kali dalam seminggu saja.",
        },
      ],
    },
  },
};

export default item;
