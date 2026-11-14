import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa sanggar tidak mampu menambah pertemuan dan pengajar karena tidak memungut biaya",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa jumlah peserta angkatan kedua lebih sedikit daripada angkatan pertama",
        },
        {
          correct: true,
          label:
            "menyingkirkan penjelasan lain bagi naiknya jumlah peserta yang bertahan sehingga perubahan urutan belajar menjadi penjelasan yang paling kuat",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa cara para pengajar membimbing peserta pada tahun kedua sama dengan tahun pertama",
        },
        {
          correct: false,
          label:
            "membandingkan beban kerja para pengajar pada tahun pertama dengan tahun kedua",
        },
      ],
    },
  },
};

export default item;
