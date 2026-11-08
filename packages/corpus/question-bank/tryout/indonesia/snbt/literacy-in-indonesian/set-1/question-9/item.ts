import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "class-ranking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa yang berperingkat tinggi lebih sering diterima di perguruan tinggi negeri daripada siswa berperingkat rendah.",
        },
        {
          correct: false,
          label:
            "Sebagian besar orang tua lebih menyukai rapor yang mencantumkan peringkat daripada rapor deskriptif.",
        },
        {
          correct: false,
          label:
            "Siswa di sekolah tanpa peringkat memperoleh rata-rata nilai ujian akhir yang sedikit lebih tinggi.",
        },
        {
          correct: true,
          label:
            "Di antara sekolah dengan latar belakang serupa, siswa di sekolah yang mencantumkan peringkat lebih jarang menjelaskan materi kepada teman daripada siswa di sekolah tanpa peringkat.",
        },
        {
          correct: false,
          label:
            "Guru memerlukan waktu dua kali lebih lama untuk menulis rapor deskriptif daripada rapor berperingkat.",
        },
      ],
    },
  },
};

export default item;
