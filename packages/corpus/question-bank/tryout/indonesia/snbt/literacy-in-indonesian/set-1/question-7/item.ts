import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "dari menjaga jarak menjadi mewariskan pengetahuan yang tidak dimiliki mesin, terlihat dari tanda langit dan kunci" },
        { correct: false, label: "dari menjaga jarak menjadi mengagumi lampu baru, terlihat dari lensa yang ia poles sampai tak bersidik jari" },
        { correct: false, label: "dari bermusuhan secara terbuka menjadi mewariskan pengetahuannya, terlihat dari tanda langit yang ia jelaskan" },
        { correct: false, label: "dari curiga kepada Wulan menjadi bergantung kepadanya, terlihat dari kunci pintu yang ia serahkan pagi itu" },
        { correct: false, label: "tetap menjaga jarak sampai akhir, terlihat dari engkol yang tidak lagi ia putar pada malam terakhir" },
      ],
    },
  },
};

export default item;
