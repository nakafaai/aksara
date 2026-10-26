import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Volumenya besar, tetapi keberlanjutan produksi tidak dapat dinilai dari jumlah tonase saja.",
        },
        {
          correct: false,
          label:
            "Program IFish yang didukung FAO dan kementerian mendorong pengelolaan berbasis ekosistem, standar kompetensi nasional, dan partisipasi masyarakat dalam perikanan darat.",
        },
        {
          correct: true,
          label:
            "Data yang andal menggambarkan kondisi setempat sehingga pengelola perikanan dapat mengambil keputusan yang sesuai.",
        },
        {
          correct: false,
          label:
            "Sekadar menambah alat tangkap dapat meningkatkan tekanan tanpa menyelesaikan masalah pengelolaan atau lingkungan.",
        },
        {
          correct: false,
          label:
            "Produksi jangka panjang bergantung pada sistem produktif yang menjaga kesehatan stok dan habitat.",
        },
      ],
    },
  },
};

export default item;
