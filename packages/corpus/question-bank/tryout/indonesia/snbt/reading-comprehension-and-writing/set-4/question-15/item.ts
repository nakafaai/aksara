import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "peron",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membantah simpulan pengelola bahwa hampir semua peminjam mengembalikan buku yang mereka ambil",
        },
        {
          correct: true,
          label:
            "membatasi apa yang dapat disimpulkan dari hitungan itu, sebab buku yang kembali belum tentu dibaca, padahal membaca adalah tujuan gerakan itu",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa gerakan itu gagal membuat penumpang membaca selama menunggu kereta",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa jumlah buku setiap Jumat tidak pernah kurang dari $$95\\%$$ jumlah awal",
        },
        {
          correct: false,
          label:
            "mengusulkan agar kartu pinjam diganti dengan cara pencatatan yang lebih teliti",
        },
      ],
    },
  },
};

export default item;
