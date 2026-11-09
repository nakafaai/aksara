import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "unpaid-internship",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Magang untuk belajar selalu diadakan di perusahaan besar yang mapan.",
        },
        {
          correct: false,
          label:
            "Magang untuk belajar selalu memberikan sertifikat di akhir masa magang.",
        },
        {
          correct: true,
          label:
            "Magang untuk belajar memiliki pembimbing yang ditunjuk, rencana belajar tertulis, dan batas waktu.",
        },
        {
          correct: false,
          label:
            "Magang untuk belajar memiliki jam kerja yang lebih pendek daripada jam kerja karyawan.",
        },
        {
          correct: false,
          label:
            "Magang untuk belajar dipilih sendiri oleh mahasiswa tanpa campur tangan kampus.",
        },
      ],
    },
  },
};

export default item;
