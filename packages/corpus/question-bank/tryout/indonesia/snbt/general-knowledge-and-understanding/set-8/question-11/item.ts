import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
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
        {
          correct: true,
          label:
            "Judul utama dapat dipakai untuk navigasi tanpa dijadikan satu-satunya kebenaran tentang objek.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
