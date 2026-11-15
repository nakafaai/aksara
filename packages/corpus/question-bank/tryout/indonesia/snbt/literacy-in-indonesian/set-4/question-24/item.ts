import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lembaga pemerintah membagikan buku pelajaran gratis ke desa-desa, tetapi hanya mencetak naskah yang tidak mengkritik kebijakan pemerintah.",
        },
        {
          correct: false,
          label:
            "Penerbit swasta mencetak buku apa saja yang diperkirakan laku, tanpa menilai isinya lebih dulu.",
        },
        {
          correct: true,
          label:
            "Sebuah aplikasi menyebarkan tulisan pengguna ke banyak pembaca secara gratis, tetapi menyembunyikan tulisan yang mengkritik pemilik aplikasi.",
        },
        {
          correct: false,
          label:
            "Perpustakaan daerah membeli setiap buku yang terbit di daerahnya agar semua warga dapat membacanya.",
        },
        {
          correct: false,
          label:
            "Kantor sensor melarang peredaran sejumlah buku, tetapi tidak menerbitkan atau membagikan bacaan apa pun.",
        },
      ],
    },
  },
};

export default item;
