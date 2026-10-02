import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uang jaminan dapat mengurangi sampah, tetapi keberhasilannya harus dinilai bersama akses layanan dan biaya bagi berbagai pihak.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pedagang menilai kebersihan seharusnya dibiayai dari anggaran acara tanpa mengubah harga wadah.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          isCorrect: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          isCorrect: true,
          label:
            "Setelah akses loket diperbaiki, selisih tingkat pengembalian antarbagian area mengecil.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
