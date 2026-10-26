import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Uji pembaca menunjukkan garis waktu mengurangi anggapan bahwa konstruksi, penggunaan, dan peresmian terjadi pada saat yang sama.",
        },
        {
          correct: false,
          label:
            "Pemandu kini menggunakan garis waktu yang sama dengan plakat, walaupun tidak ada bukti baru mengenai keempat peristiwa.",
        },
        {
          correct: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          correct: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          correct: true,
          label:
            "Pemeriksaan asal sumber membuktikan bahwa dokumen 1914 dan 1916 serta foto penggantian 1958 merujuk pada jembatan lain.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
