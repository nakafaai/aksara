import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa memakai kemiripan visual sebagai bukti bahwa mantel yang sama pasti muncul pada ketiga foto, lalu memakai buku perawatan untuk melengkapi tahun yang hilang.",
        },
        {
          correct: true,
          label:
            "Siswa mempertemukan bukti penggunaan dan perawatan untuk memperkuat dugaan pemakaian ulang, sambil mempertahankan ketidakpastian identitas mantel pada $$2019$$.",
        },
        {
          correct: false,
          label:
            "Siswa menolak foto karena dibuat untuk publikasi dan hanya menerima buku perawatan sebagai sumber sejarah yang netral.",
        },
        {
          correct: false,
          label:
            "Siswa menganggap berakhirnya buku perawatan pada $$2010$$ membuktikan bahwa mantel M-17 tidak mungkin digunakan pada $$2019$$.",
        },
        {
          correct: false,
          label:
            "Siswa menggabungkan seluruh sumber menjadi satu urutan lengkap karena dua catatan yang tidak lengkap akan selalu menutup celah satu sama lain.",
        },
      ],
    },
  },
};

export default item;
