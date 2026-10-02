import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uji pembaca menunjukkan garis waktu mengurangi anggapan bahwa konstruksi, penggunaan, dan peresmian terjadi pada saat yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pemandu kini menggunakan garis waktu yang sama dengan plakat, walaupun tidak ada bukti baru mengenai keempat peristiwa.",
        },
        {
          isCorrect: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          isCorrect: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: true,
          label:
            "Pemeriksaan asal sumber membuktikan bahwa dokumen 1914 dan 1916 serta foto penggantian 1958 merujuk pada jembatan lain.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
