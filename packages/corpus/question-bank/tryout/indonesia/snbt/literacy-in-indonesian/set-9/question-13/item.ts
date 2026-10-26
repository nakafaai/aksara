import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Memasang papan baru secara tetap, lalu menganggap berkurangnya pertanyaan kepada petugas sebagai bukti bahwa semua kebutuhan sudah terpenuhi.",
        },
        {
          correct: false,
          label:
            "Mengulang uji hanya pada pengunjung berpenglihatan biasa karena kelompok itu memiliki jumlah peserta terbesar.",
        },
        {
          correct: true,
          label:
            "Melibatkan kelompok pengguna yang belum terwakili, mengacak kondisi pada blok yang sebanding, lalu melaporkan hasil dan pengalaman setiap kelompok secara terpisah.",
        },
        {
          correct: false,
          label:
            "Menggabungkan semua kelompok ke dalam satu persentase yang lebih besar agar hasil mudah dibandingkan dengan uji pertama.",
        },
        {
          correct: false,
          label:
            "Meminta perancang papan menilai produknya sendiri tanpa pengamatan perjalanan pengguna di jalur tersebut.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
