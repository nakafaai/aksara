import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hanya bangunan sekolah yang memerlukan pengurangan risiko bencana karena infrastruktur lain sudah aman.",
        },
        {
          correct: false,
          label:
            "Sistem peringatan dini dapat menggantikan perencanaan berbasis risiko dan penegakan aturan dalam pembangunan.",
        },
        {
          correct: false,
          label:
            "Risiko bencana baru perlu diperhitungkan setelah investasi pembangunan selesai dijalankan.",
        },
        {
          correct: false,
          label:
            "Penguatan bangunan sudah cukup meskipun tanpa regulasi, pengawasan, atau latihan kesiapsiagaan.",
        },
        {
          correct: true,
          label:
            "Pengurangan risiko bencana harus menjadi acuan investasi pembangunan agar bangunan lebih aman dan warga lebih siap menghadapi bencana.",
        },
      ],
    },
  },
};

export default item;
