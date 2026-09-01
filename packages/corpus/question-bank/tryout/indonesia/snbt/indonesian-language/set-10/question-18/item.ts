import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penerangan tampaknya lebih tersedia di sekitar pasar dan jalan utama daripada jalur sungai, tetapi tiga catatan belum cukup untuk mewakili seluruh rute atau memastikan kinerja setiap lampu.",
        },
        {
          isCorrect: false,
          label:
            "Semua lampu bertanda penuh pasti berfungsi karena kantor desa telah menulis bahwa pemeriksaan selesai.",
        },
        {
          isCorrect: false,
          label:
            "Empat malam gelap di jalur sungai membuktikan seluruh proyek penerangan gagal di seluruh kampung.",
        },
        {
          isCorrect: false,
          label:
            "Pengalaman Sari membuktikan lampu pasar menyala setiap malam sepanjang tahun sampai pukul sembilan.",
        },
        {
          isCorrect: false,
          label:
            "Karena Mina tetap menghindari gang, pemasangan lampu tidak mengubah pengalaman malam siapa pun.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
