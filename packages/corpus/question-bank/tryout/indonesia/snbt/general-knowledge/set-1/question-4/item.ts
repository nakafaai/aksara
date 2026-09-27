import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tidur pada hewan membuktikan bahwa kucing bermimpi tentang kegiatan yang dilakukannya ketika terjaga.",
        },
        {
          isCorrect: false,
          label:
            "Setiap mimpi menayangkan ulang pengalaman baru secara persis dan memperkuat ingatan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Mimpi hanya terjadi dalam tidur REM karena otak tidak aktif pada tahap lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Mimpi berkaitan dengan aktivitas otak saat tidur dan potongan pengalaman terjaga, tetapi fungsi tepatnya masih diteliti.",
        },
        {
          isCorrect: false,
          label:
            "Tujuan mimpi sudah dipahami sepenuhnya sehingga tidak perlu diteliti lagi.",
        },
      ],
    },
  },
};

export default item;
