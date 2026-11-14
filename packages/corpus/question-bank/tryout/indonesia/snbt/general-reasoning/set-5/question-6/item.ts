import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "bimbel",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian siswa menonton rekaman sesi yang sama lebih dari sekali.",
        },
        {
          correct: true,
          label:
            "Siswa yang pada Januari tidak pernah hadir mulai hadir pada beberapa sesi, sedangkan banyak siswa lain hadir pada lebih sedikit sesi daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Banyak siswa tersambung kurang dari $$80$$ menit pada sesi-sesi Februari sehingga tidak dicatat hadir.",
        },
        {
          correct: false,
          label:
            "Pada Februari, bimbel itu menerima siswa baru sehingga siswa terdaftar bertambah.",
        },
        {
          correct: false,
          label:
            "Pada Februari, setiap sesi dihadiri oleh $$120$$ siswa yang sama.",
        },
      ],
    },
  },
};

export default item;
