import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Volumenya besar, tetapi keberlanjutan produksi tidak dapat dinilai dari jumlah tonase saja.",
        },
        {
          isCorrect: false,
          label:
            "Program IFish yang didukung FAO dan kementerian mendorong pengelolaan berbasis ekosistem, standar kompetensi nasional, dan partisipasi masyarakat dalam perikanan darat.",
        },
        {
          isCorrect: true,
          label:
            "Data yang andal menggambarkan kondisi setempat sehingga pengelola perikanan dapat mengambil keputusan yang sesuai.",
        },
        {
          isCorrect: false,
          label:
            "Sekadar menambah alat tangkap dapat meningkatkan tekanan tanpa menyelesaikan masalah pengelolaan atau lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Produksi jangka panjang bergantung pada sistem produktif yang menjaga kesehatan stok dan habitat.",
        },
      ],
    },
  },
};

export default item;
