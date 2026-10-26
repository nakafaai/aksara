import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Uang jaminan dapat mengurangi sampah, tetapi keberhasilannya harus dinilai bersama akses layanan dan biaya bagi berbagai pihak.",
        },
        {
          correct: false,
          label:
            "Sebagian pedagang menilai kebersihan seharusnya dibiayai dari anggaran acara tanpa mengubah harga wadah.",
        },
        {
          correct: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          correct: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          correct: true,
          label:
            "Setelah akses loket diperbaiki, selisih tingkat pengembalian antarbagian area mengecil.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
