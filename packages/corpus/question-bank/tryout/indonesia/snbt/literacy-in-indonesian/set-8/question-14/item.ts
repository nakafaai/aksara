import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "science-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua hasil terbit di jurnal berbahasa Inggris dengan ringkasan berbahasa Indonesia bagi pemakai dalam negeri, dan manfaat bagi pemakai seperti pemerintah daerah ikut dinilai di samping sitasi.",
        },
        {
          correct: false,
          label:
            "Semua hasil terbit lengkap dalam bahasa Indonesia saja, dan manfaat bagi pemakai seperti pemerintah daerah dinilai sebagai pengganti sitasi.",
        },
        {
          correct: false,
          label:
            "Semua hasil terbit lengkap dalam bahasa Indonesia dengan abstrak dan ringkasan berbahasa Inggris, temuan yang penting bagi peneliti luar negeri juga terbit di jurnal berbahasa Inggris, dan kinerja dosen dinilai dari sitasi saja.",
        },
        {
          correct: true,
          label:
            "Semua hasil terbit lengkap dalam bahasa Indonesia dengan abstrak dan ringkasan berbahasa Inggris, temuan yang penting bagi peneliti luar negeri juga terbit di jurnal berbahasa Inggris, dan manfaat bagi pemakai seperti pemerintah daerah ikut dinilai di samping sitasi.",
        },
        {
          correct: false,
          label:
            "Temuan yang penting bagi peneliti luar negeri hanya terbit di jurnal berbahasa Inggris, temuan lain terbit lengkap dalam bahasa Indonesia, dan manfaat bagi pemakai seperti pemerintah daerah ikut dinilai di samping sitasi.",
        },
      ],
    },
  },
};

export default item;
