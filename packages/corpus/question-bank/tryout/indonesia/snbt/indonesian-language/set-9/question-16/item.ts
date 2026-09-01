import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Siswa memakai kemiripan visual sebagai bukti bahwa mantel yang sama pasti muncul pada ketiga foto, lalu memakai buku perawatan untuk melengkapi tahun yang hilang.",
        },
        {
          isCorrect: true,
          label:
            "Siswa mempertemukan bukti penggunaan dan perawatan untuk memperkuat dugaan pemakaian ulang, sambil mempertahankan ketidakpastian identitas mantel pada 2019.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menolak foto karena dibuat untuk publikasi dan hanya menerima buku perawatan sebagai sumber sejarah yang netral.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menganggap berakhirnya buku perawatan pada 2010 membuktikan bahwa mantel M-17 tidak mungkin digunakan pada 2019.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menggabungkan seluruh sumber menjadi satu urutan lengkap karena dua catatan yang tidak lengkap akan selalu menutup celah satu sama lain.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
