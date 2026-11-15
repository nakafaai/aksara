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
            "Loker kelas masih membiarkan siswa memegang ponsel saat istirahat, padahal Teks A menghitung obrolan saat istirahat sebagai hasil larangan.",
        },
        {
          correct: false,
          label:
            "Loker kelas tetap tidak dapat diawasi, karena guru tidak mungkin memeriksa tiga puluh saku siswa setiap jam pelajaran.",
        },
        {
          correct: false,
          label:
            "Loker kelas terlalu mahal untuk disediakan di setiap kelas, sehingga larangan penuh dengan loket satpam lebih hemat.",
        },
        {
          correct: false,
          label:
            "Loker kelas tidak diperlukan, karena kenaikan nilai di SMA Harapan Bangsa sudah membuktikan bahwa siswa patuh tanpa pengawasan.",
        },
        {
          correct: false,
          label:
            "Loker kelas dapat diterima, karena loker juga menjauhkan ponsel dari tangan siswa selama pelajaran berlangsung.",
        },
      ],
    },
  },
};

export default item;
