import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Loker kelas tidak menjangkau jam istirahat, padahal Teks A menghitung siswa yang kembali mengobrol saat istirahat sebagai salah satu hasil larangan.",
        },
        {
          correct: false,
          label:
            "Loker kelas tidak menjangkau jam istirahat, padahal Teks A menyebut kenaikan nilai dari $$68$$ menjadi $$74$$ terjadi karena ponsel tidak dipakai saat istirahat.",
        },
        {
          correct: false,
          label:
            "Loker kelas tidak menjangkau jam istirahat, padahal Teks A menyebut notifikasi saat istirahat sebagai penyebab utama perhatian siswa pecah.",
        },
        {
          correct: false,
          label:
            "Loker kelas tidak diperlukan, karena Teks A menganggap ponsel yang dimatikan selama pelajaran sudah cukup untuk menjaga perhatian siswa.",
        },
        {
          correct: false,
          label:
            "Loker kelas dapat diterima, karena Teks A hanya mempersoalkan ponsel yang bergetar di saku selama pelajaran berlangsung.",
        },
      ],
    },
  },
};

export default item;
