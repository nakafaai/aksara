import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penerangan tampaknya lebih tersedia di sekitar pasar dan jalan utama daripada jalur sungai, tetapi tiga catatan belum cukup untuk mewakili seluruh rute atau memastikan kinerja setiap lampu.",
        },
        {
          correct: false,
          label:
            "Semua lampu bertanda penuh pasti berfungsi karena kantor desa telah menulis bahwa pemeriksaan selesai.",
        },
        {
          correct: false,
          label:
            "Empat malam gelap di jalur sungai membuktikan seluruh proyek penerangan gagal di seluruh kampung.",
        },
        {
          correct: false,
          label:
            "Pengalaman Sari membuktikan lampu pasar menyala setiap malam sepanjang tahun sampai pukul sembilan.",
        },
        {
          correct: false,
          label:
            "Karena Mina tetap menghindari gang, pemasangan lampu tidak mengubah pengalaman malam siapa pun.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
