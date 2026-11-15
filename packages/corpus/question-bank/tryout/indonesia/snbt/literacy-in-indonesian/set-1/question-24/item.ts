import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Dokumen itu memakai Ejaan Republik, karena masih ada gabungan huruf *dj* di dalamnya yang baru diganti pada 1972." },
        { correct: false, label: "Dokumen itu melanggar EYD, karena gabungan huruf *dj* seharusnya sudah ditulis *j* di semua kata sejak 1972." },
        { correct: true, label: "Dokumen itu bisa dari 1985, karena kata-katanya mengikuti EYD, sedangkan *dj* pada nama diri sering dipertahankan." },
        { correct: false, label: "Dokumen itu mencampur dua ejaan dari zaman berbeda, sehingga tidak mungkin berasal dari sebuah dokumen resmi." },
        { correct: false, label: "Dokumen itu memakai ejaan Van Ophuijsen, karena nama yang memakai *dj* pasti berasal dari masa pemerintahan kolonial." },
      ],
    },
  },
};

export default item;
