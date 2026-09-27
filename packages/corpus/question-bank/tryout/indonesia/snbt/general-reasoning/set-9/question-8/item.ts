import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap siswa yang masuk Universitas $$P$$ telah lulus sekolah",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada siswa yang mengundurkan diri lalu masuk Universitas $$P$$ pada angkatan yang sama",
        },
        {
          isCorrect: false,
          label:
            "Setiap siswa yang mengundurkan diri mengikuti program penempatan kerja sekolah",
        },
        {
          isCorrect: false,
          label:
            "Kategori lulus dan kategori mengundurkan diri tidak saling tumpang tindih",
        },
        {
          isCorrect: true,
          label:
            "Siswa yang masuk Universitas $$P$$ termasuk kategori mengundurkan diri",
        },
      ],
    },
  },
};

export default item;
