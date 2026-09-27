import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap busana tradisional harus dibuat oleh anggota keluarga",
        },
        {
          isCorrect: false,
          label: "Busana tradisional hanya dikenakan dalam perayaan publik",
        },
        {
          isCorrect: false,
          label:
            "Perajin lokal tidak berperan karena pengetahuan hanya diwariskan dalam keluarga",
        },
        {
          isCorrect: false,
          label:
            "Penggunaan beragam busana tradisional menghalangi orang untuk merasa saling mengenali",
        },
        {
          isCorrect: true,
          label:
            "Tradisi tersebut memadukan busana, pengetahuan bersama, dan praktik sosial yang menghubungkan identitas dengan kebersamaan dalam masyarakat",
        },
      ],
    },
  },
};

export default item;
