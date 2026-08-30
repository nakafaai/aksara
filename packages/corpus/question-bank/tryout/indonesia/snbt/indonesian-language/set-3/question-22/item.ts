import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam ruang arsip sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam ruang arsip sekolah memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan ruang arsip sekolah.",
        },
        {
          isCorrect: true,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut metakognisi sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
