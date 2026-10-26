import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "menyusun dugaan sementara yang dapat diuji",
        },
        {
          correct: false,
          label: "menetapkan penyebab sebagai simpulan akhir",
        },
        {
          correct: false,
          label: "menghapus data yang tidak sesuai dengan dugaan",
        },
        {
          correct: false,
          label: "merangkum hasil setelah seluruh uji selesai",
        },
        {
          correct: false,
          label: "mengganti pengukuran dengan penilaian peserta",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
