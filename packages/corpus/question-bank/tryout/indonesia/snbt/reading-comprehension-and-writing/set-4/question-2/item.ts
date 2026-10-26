import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
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
};

export default item;
