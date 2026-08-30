import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam ruang penyimpanan karya seni pada malam hari.",
        },
        {
          isCorrect: true,
          label:
            "Reno memilih untuk membaca kartu kondisi satu per satu sebelum memindahkan lukisan terakhir.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam ruang penyimpanan karya seni pada malam hari memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan ruang penyimpanan karya seni pada malam hari.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut sudut pandang terbatas sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
