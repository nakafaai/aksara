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
        { correct: true, label: "Pilihan bawaan dapat menaikkan keikutsertaan jauh lebih kuat daripada bujukan atau iklan." },
        { correct: false, label: "Mengganti sistem masuk menjadi sistem keluar pasti menambah jumlah organ yang benar-benar didonorkan." },
        { correct: true, label: "Keikutsertaan yang naik karena pilihan bawaan belum tentu menghasilkan hasil akhir yang diinginkan." },
        { correct: false, label: "Pilihan bawaan hanya berpengaruh pada orang yang malas membaca formulir sampai selesai." },
        { correct: true, label: "Pilihan bawaan yang sama dapat menambah peserta sekaligus menurunkan rata-rata iuran per peserta." },
      ],
    },
  },
};

export default item;
