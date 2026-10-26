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
            "Struktur basis data dapat memengaruhi nama siapa yang tampak paling sah bagi pengguna.",
        },
        {
          correct: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
        {
          correct: false,
          label:
            "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain.",
        },
        {
          correct: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
        {
          correct: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
      ],
    },
  },
};

export default item;
