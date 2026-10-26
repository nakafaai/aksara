import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peta berubah dari daftar lokasi lampu terpasang menjadi catatan bersama yang membedakan data resmi, kondisi teramati, waktu, sumber, dan bagian yang belum diketahui.",
        },
        {
          correct: false,
          label:
            "Peta berubah dari dokumen kantor menjadi kumpulan ingatan warga yang menggantikan seluruh data resmi.",
        },
        {
          correct: false,
          label:
            "Peta berubah menjadi bukti bahwa catatan warga tidak dapat dipercaya ketika keterangannya berbeda.",
        },
        {
          correct: false,
          label:
            "Peta berubah menjadi karya pajangan yang terutama menunjukkan kemampuan Nara menggambar lingkaran cahaya.",
        },
        {
          correct: false,
          label:
            "Peta berubah menjadi penetapan akhir tentang jalan yang aman dilewati pada setiap waktu dan cuaca.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
