import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Hanya bangunan sekolah yang memerlukan pengurangan risiko bencana karena infrastruktur lain sudah aman.",
        },
        {
          isCorrect: false,
          label:
            "Sistem peringatan dini dapat menggantikan perencanaan berbasis risiko dan penegakan aturan dalam pembangunan.",
        },
        {
          isCorrect: false,
          label:
            "Risiko bencana baru perlu diperhitungkan setelah investasi pembangunan selesai dijalankan.",
        },
        {
          isCorrect: false,
          label:
            "Penguatan bangunan sudah cukup meskipun tanpa regulasi, pengawasan, atau latihan kesiapsiagaan.",
        },
        {
          isCorrect: true,
          label:
            "Pengurangan risiko bencana harus menjadi acuan investasi pembangunan agar bangunan lebih aman dan warga lebih siap menghadapi bencana.",
        },
      ],
    },
  },
};

export default item;
