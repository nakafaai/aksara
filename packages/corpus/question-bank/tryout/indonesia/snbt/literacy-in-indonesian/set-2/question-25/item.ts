import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Kebun raya terlalu kecil untuk menanam semua jenis tumbuhan, sehingga sebagian jenis tidak tertampung." },
        { correct: true, label: "Setiap jenis hanya diwakili sedikit individu, dan penyerbuk, jamur tanah, atau penyebar bijinya tidak ikut pindah ke kebun." },
        { correct: false, label: "Kebun raya hanya memuat sedikit individu setiap jenis, sehingga tumbuhan di kebun lebih mudah terserang penyakit daripada di hutan." },
        { correct: false, label: "Kebun raya dikelola untuk kebutuhan perkebunan, sehingga tumbuhan yang tidak bernilai dagang tidak dirawat." },
        { correct: false, label: "Tumbuhan di kebun raya tidak dapat berbuah, karena iklim Bogor berbeda dengan iklim hutan asalnya." },
      ],
    },
  },
};

export default item;
