import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "moda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Persentase pesepeda yang lebih kecil di sekolah B berarti banyak pesepedanya juga lebih sedikit.",
        },
        {
          correct: true,
          label:
            "Banyak siswa sekolah B yang bersepeda lebih banyak daripada siswa sekolah A yang bersepeda.",
        },
        {
          correct: false,
          label:
            "Jika kedua sekolah digabung, banyak pengguna angkutan umum kurang dari $$700$$ orang.",
        },
        {
          correct: false,
          label:
            "Siswa sekolah A yang berjalan kaki lebih sedikit daripada siswa sekolah B yang berjalan kaki.",
        },
        {
          correct: false,
          label:
            "Lebih dari separuh siswa sekolah B diantar keluarga atau berjalan kaki.",
        },
      ],
    },
  },
};

export default item;
