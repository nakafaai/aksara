import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengirim Semua Kotak agar Target Terlihat Selesai",
        },
        {
          correct: false,
          label: "Menyembunyikan Ketidakcocokan Label Setelah Kapal Berangkat",
        },
        {
          correct: true,
          label: "Menahan Dua Kotak: Akuntabilitas Bima di Gudang Pelabuhan",
        },
        {
          correct: false,
          label:
            "Akuntabilitas sebagai Definisi Tanpa Tindakan yang Dapat Diperiksa",
        },
        {
          correct: false,
          label: "Delapan Belas Kotak sebagai Satu-satunya Ukuran Kepemimpinan",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
