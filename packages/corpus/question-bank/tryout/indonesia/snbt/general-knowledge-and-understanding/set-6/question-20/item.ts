import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Analisis tambahan memastikan jejak dari beberapa masa memang menjadi bagian penting riwayat penggunaan balai.",
        },
        {
          correct: false,
          label:
            "Pengguna berbeda pendapat tentang perlunya penanda warna pada tambahan modern, tetapi tetap dapat mengenali unsur bangunan yang lebih tua.",
        },
        {
          correct: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          correct: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          correct: true,
          label:
            "Pemeriksaan baru menunjukkan semua bahan yang dianggap lama ternyata dipasang pada renovasi modern yang tidak terdokumentasi.",
        },
      ],
    },
  },
};

export default item;
