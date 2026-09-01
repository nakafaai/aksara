import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Memasang papan baru secara tetap, lalu menganggap berkurangnya pertanyaan kepada petugas sebagai bukti bahwa semua kebutuhan sudah terpenuhi.",
        },
        {
          isCorrect: false,
          label:
            "Mengulang uji hanya pada pengunjung berpenglihatan biasa karena kelompok itu memiliki jumlah peserta terbesar.",
        },
        {
          isCorrect: true,
          label:
            "Melibatkan kelompok pengguna yang belum terwakili, mengacak kondisi pada blok yang sebanding, lalu melaporkan hasil dan pengalaman setiap kelompok secara terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Menggabungkan semua kelompok ke dalam satu persentase yang lebih besar agar hasil mudah dibandingkan dengan uji pertama.",
        },
        {
          isCorrect: false,
          label:
            "Meminta perancang papan menilai produknya sendiri tanpa pengamatan perjalanan pengguna di jalur tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
