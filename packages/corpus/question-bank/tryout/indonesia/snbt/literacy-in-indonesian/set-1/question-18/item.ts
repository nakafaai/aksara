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
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Pada semester ganjil 2023, tingkat kehadiran setiap sekolah uji coba lebih rendah daripada tingkat kehadiran gabungan sekolah lain di kabupaten itu." },
        { column: 1, label: "Pada semester ganjil 2024, tingkat kehadiran gabungan seluruh siswa di keempat sekolah uji coba lebih dari $$92\\%$$." },
        { column: 2, label: "Makan siang gratis menaikkan tingkat kehadiran di SD Kalirejo sebesar delapan poin." },
        { column: 1, label: "Kenaikan tingkat kehadiran di SD Tegalsari dan SD Watugede lebih besar daripada kenaikan di sekolah yang tidak mendapat program." },
      ],
    },
  },
};

export default item;
