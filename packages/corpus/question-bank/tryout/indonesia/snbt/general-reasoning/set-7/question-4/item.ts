import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sesi Arin berlanjut tanpa dihentikan.",
        },
        {
          isCorrect: false,
          label: "Kartu akses Arin tetap aktif selama peninjauan.",
        },
        {
          isCorrect: true,
          label: "Kartu akses Arin ditangguhkan sampai peninjauan selesai.",
        },
        {
          isCorrect: false,
          label: "Kartu akses pengawas ditangguhkan.",
        },
        {
          isCorrect: false,
          label:
            "Mesin pemotong laser dikeluarkan secara permanen dari laboratorium.",
        },
      ],
    },
  },
};

export default item;
