import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "class-size",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa kelas kecil tidak bermanfaat bagi siswa SD di mana pun, sehingga usul Teks A sebaiknya ditolak seluruhnya",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa manfaat kelas kecil dapat menyusut kalau kebijakan diperluas lebih cepat daripada tersedianya guru yang layak",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Project STAR dirancang dengan buruk, sehingga hasilnya tidak dapat dipercaya",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa California membatasi ukuran kelas lebih ketat daripada batas yang diusulkan Teks A untuk Lembah Hijau",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa guru bersertifikat lebih suka mengajar di sekolah-sekolah di kawasan miskin",
        },
      ],
    },
  },
};

export default item;
