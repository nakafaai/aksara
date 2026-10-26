import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap siswa yang masuk Universitas $$P$$ telah lulus sekolah",
        },
        {
          correct: false,
          label:
            "Tidak ada siswa yang mengundurkan diri lalu masuk Universitas $$P$$ pada angkatan yang sama",
        },
        {
          correct: false,
          label:
            "Setiap siswa yang mengundurkan diri mengikuti program penempatan kerja sekolah",
        },
        {
          correct: false,
          label:
            "Kategori lulus dan kategori mengundurkan diri tidak saling tumpang tindih",
        },
        {
          correct: true,
          label:
            "Siswa yang masuk Universitas $$P$$ termasuk kategori mengundurkan diri",
        },
      ],
    },
  },
};

export default item;
