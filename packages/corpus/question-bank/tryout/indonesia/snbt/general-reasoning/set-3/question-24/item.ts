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
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak siswa sekolah B yang diantar keluarga lebih banyak $$160$$ orang daripada siswa sekolah A yang diantar keluarga.",
        },
        {
          column: 2,
          label:
            "Jika siswa kedua sekolah digabung, persentase siswa yang bersepeda adalah $$22{,}5\\%$$.",
        },
        {
          column: 1,
          label:
            "Jika siswa kedua sekolah digabung, siswa yang memakai angkutan umum mencakup $$38\\%$$.",
        },
        {
          column: 2,
          label:
            "Selisih banyak pengguna angkutan umum di kedua sekolah kurang dari $$200$$ orang.",
        },
      ],
    },
  },
};

export default item;
