import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menunggu orang lain menyelesaikan langkah berikutnya",
        },
        {
          correct: false,
          label: "Menyembunyikan bukti yang belum tuntas dalam proyek besar",
        },
        {
          correct: true,
          label: "Dari Lorong Sempit ke Usulan Akses Nisa",
        },
        {
          correct: false,
          label:
            "advokasi diri sebagai definisi tanpa tindakan yang dapat diperiksa",
        },
        {
          correct: false,
          label: "Rencana lengkap tanpa langkah kecil yang bertanggung jawab",
        },
      ],
    },
  },
};

export default item;
