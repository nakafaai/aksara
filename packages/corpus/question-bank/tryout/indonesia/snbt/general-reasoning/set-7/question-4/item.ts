import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sesi Arin berlanjut tanpa dihentikan.",
        },
        {
          correct: false,
          label: "Kartu akses Arin tetap aktif selama peninjauan.",
        },
        {
          correct: true,
          label: "Kartu akses Arin ditangguhkan sampai peninjauan selesai.",
        },
        {
          correct: false,
          label: "Kartu akses pengawas ditangguhkan.",
        },
        {
          correct: false,
          label:
            "Mesin pemotong laser dikeluarkan secara permanen dari laboratorium.",
        },
      ],
    },
  },
};

export default item;
