import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peta berubah dari daftar lokasi lampu terpasang menjadi catatan bersama yang membedakan data resmi, kondisi teramati, waktu, sumber, dan bagian yang belum diketahui.",
        },
        {
          isCorrect: false,
          label:
            "Peta berubah dari dokumen kantor menjadi kumpulan ingatan warga yang menggantikan seluruh data resmi.",
        },
        {
          isCorrect: false,
          label:
            "Peta berubah menjadi bukti bahwa catatan warga tidak dapat dipercaya ketika keterangannya berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Peta berubah menjadi karya pajangan yang terutama menunjukkan kemampuan Nara menggambar lingkaran cahaya.",
        },
        {
          isCorrect: false,
          label:
            "Peta berubah menjadi penetapan akhir tentang jalan yang aman dilewati pada setiap waktu dan cuaca.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
