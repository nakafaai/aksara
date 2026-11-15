import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "school-meals",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Makan siang gratis menaikkan tingkat kehadiran di setiap sekolah uji coba sekitar delapan poin." },
        { correct: false, label: "Sekolah uji coba yang lebih kecil mengalami kenaikan tingkat kehadiran yang lebih besar." },
        { correct: false, label: "Pada 2024, tingkat kehadiran keempat sekolah uji coba sudah melampaui sekolah lain di kabupaten itu." },
        { correct: true, label: "Kenaikan besar hanya terjadi di sekolah yang juga dilalui rute angkutan baru, sedangkan dua sekolah lainnya hanya naik satu poin lebih banyak daripada sekolah tanpa program." },
        { correct: false, label: "Rute angkutan baru, bukan makan siang gratis, yang menyebabkan kenaikan tingkat kehadiran di sekolah uji coba, karena kenaikan terbesar terjadi di desa yang dilalui rute itu." },
      ],
    },
  },
};

export default item;
