import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Analisis tambahan memastikan jejak dari beberapa masa memang menjadi bagian penting riwayat penggunaan balai.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna berbeda pendapat tentang perlunya penanda warna pada tambahan modern, tetapi tetap dapat mengenali unsur bangunan yang lebih tua.",
        },
        {
          isCorrect: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          isCorrect: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          isCorrect: true,
          label:
            "Pemeriksaan baru menunjukkan semua bahan yang dianggap lama ternyata dipasang pada renovasi modern yang tidak terdokumentasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
