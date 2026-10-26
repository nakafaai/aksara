import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "sesi ketika rak hanya memakai kode huruf lama sebagai acuan bagi sesi uji",
        },
        {
          correct: false,
          label: "sesi ketika hasil akhir diumumkan kepada peminjam",
        },
        {
          correct: false,
          label: "sesi pertama sebelum pencatatan nilai awal dimulai",
        },
        {
          correct: false,
          label: "sesi ketika dua perubahan diuji sekaligus",
        },
        {
          correct: false,
          label: "sesi tanpa kegiatan agar petugas dapat beristirahat",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
