import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Setiap busana tradisional harus dibuat oleh anggota keluarga",
        },
        {
          correct: false,
          label: "Busana tradisional hanya dikenakan dalam perayaan publik",
        },
        {
          correct: false,
          label:
            "Perajin lokal tidak berperan karena pengetahuan hanya diwariskan dalam keluarga",
        },
        {
          correct: false,
          label:
            "Penggunaan beragam busana tradisional menghalangi orang untuk merasa saling mengenali",
        },
        {
          correct: true,
          label:
            "Tradisi tersebut memadukan busana, pengetahuan bersama, dan praktik sosial yang menghubungkan identitas dengan kebersamaan dalam masyarakat",
        },
      ],
    },
  },
};

export default item;
