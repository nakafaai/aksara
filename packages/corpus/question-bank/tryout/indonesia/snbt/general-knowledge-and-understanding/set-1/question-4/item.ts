import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tidur pada hewan membuktikan bahwa kucing bermimpi tentang kegiatan yang dilakukannya ketika terjaga.",
        },
        {
          correct: false,
          label:
            "Setiap mimpi menayangkan ulang pengalaman baru secara persis dan memperkuat ingatan tersebut.",
        },
        {
          correct: false,
          label:
            "Mimpi hanya terjadi dalam tidur REM karena otak tidak aktif pada tahap lainnya.",
        },
        {
          correct: true,
          label:
            "Mimpi berkaitan dengan aktivitas otak saat tidur dan potongan pengalaman terjaga, tetapi fungsi tepatnya masih diteliti.",
        },
        {
          correct: false,
          label:
            "Tujuan mimpi sudah dipahami sepenuhnya sehingga tidak perlu diteliti lagi.",
        },
      ],
    },
  },
};

export default item;
