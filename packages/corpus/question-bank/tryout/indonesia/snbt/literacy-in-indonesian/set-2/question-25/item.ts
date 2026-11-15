import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "menanam lebih banyak individu dari berbagai populasi di kebun raya" },
        { correct: true, label: "melindungi hutan tempat tumbuhan itu hidup bersama penyerbuk dan jamurnya" },
        { correct: false, label: "mendatangkan penyerbuk dan hewan penyebar biji dari hutan ke dalam kebun raya" },
        { correct: false, label: "menyimpan biji tumbuhan itu di bank biji yang suhunya rendah" },
        { correct: false, label: "memperluas kebun raya agar dapat menampung lebih banyak jenis tumbuhan" },
      ],
    },
  },
};

export default item;
