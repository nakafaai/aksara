import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Catatan rapat mengungkap hambatan, lalu perubahan prosedur dirancang untuk mengurangi hambatan dan menguji keterwakilan.",
        },
        {
          correct: false,
          label:
            "Bagian awal membuktikan semua kelompok telah terwakili, lalu bagian berikutnya menghapus pemeriksaan asal peserta.",
        },
        {
          correct: false,
          label:
            "Bagian awal membandingkan biaya angkutan, lalu bagian berikutnya memilih jadwal berdasarkan layanan termurah.",
        },
        {
          correct: false,
          label:
            "Bagian awal menerima semua usulan, lalu bagian berikutnya menyusun cara menerapkan setiap keinginan warga.",
        },
        {
          correct: false,
          label:
            "Bagian awal mengkritik undangan terbuka, lalu bagian berikutnya membatasi keputusan kepada warga dari wilayah terdekat.",
        },
      ],
    },
  },
};

export default item;
