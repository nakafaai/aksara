import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dengan membagi pemeriksaan dan menahan dua kotak yang meragukan, Bima beralih dari mengejar hasil lengkap menuju koordinasi yang dapat dipertanggungjawabkan.",
        },
        {
          correct: false,
          label:
            "Bima membagi pekerjaan mencocokkan nomor kotak dan mencetak ulang label sambil mencatat alasan setiap perubahan. Tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Bima membagi pekerjaan mencocokkan nomor kotak dan mencetak ulang label sambil mencatat alasan setiap perubahan. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          correct: false,
          label:
            "Bima membagi pekerjaan mencocokkan nomor kotak dan mencetak ulang label sambil mencatat alasan setiap perubahan. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          correct: false,
          label:
            "Bima membagi pekerjaan mencocokkan nomor kotak dan mencetak ulang label sambil mencatat alasan setiap perubahan. Definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
};

export default item;
