import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "sea-sasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sasi dihapus karena tidak lagi berguna bagi warga negeri",
        },
        {
          correct: false,
          label: "warga negeri sering melanggar sasi pada malam hari",
        },
        { correct: false, label: "polisi air melarang upacara buka sasi" },
        {
          correct: false,
          label:
            "hasil penjualan lola dipakai untuk memperbaiki rumah ibadah dan sekolah",
        },
        {
          correct: true,
          label:
            "sasi menghadapi pelanggaran dari luar daerah sehingga negeri memperkuatnya dengan aturan tertulis dan kerja sama dengan polisi air",
        },
      ],
    },
  },
};

export default item;
