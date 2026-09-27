import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Catatan rapat mengungkap hambatan, lalu perubahan prosedur dirancang untuk mengurangi hambatan dan menguji keterwakilan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membuktikan semua kelompok telah terwakili, lalu bagian berikutnya menghapus pemeriksaan asal peserta.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan biaya angkutan, lalu bagian berikutnya memilih jadwal berdasarkan layanan termurah.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menerima semua usulan, lalu bagian berikutnya menyusun cara menerapkan setiap keinginan warga.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengkritik undangan terbuka, lalu bagian berikutnya membatasi keputusan kepada warga dari wilayah terdekat.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
