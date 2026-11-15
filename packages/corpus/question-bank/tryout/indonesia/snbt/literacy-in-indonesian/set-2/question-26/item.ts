import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Pilihan bawaan sangat memengaruhi keikutsertaan, tetapi keikutsertaan yang naik belum tentu menghasilkan hasil akhir yang diinginkan." },
        { correct: false, label: "Pilihan bawaan sangat memengaruhi keikutsertaan orang, sehingga sistem keluar pasti menambah jumlah organ yang benar-benar didonorkan." },
        { correct: false, label: "Pilihan bawaan hanya berpengaruh pada orang yang malas membaca formulir, bukan pada orang yang memahami pilihannya." },
        { correct: false, label: "Pilihan bawaan adalah cara halus untuk mengatur orang, sehingga sebaiknya semua formulir dibiarkan kosong." },
        { correct: false, label: "Pilihan bawaan berpengaruh lebih kecil daripada iklan dan uang, tetapi lebih murah untuk diterapkan." },
      ],
    },
  },
};

export default item;
