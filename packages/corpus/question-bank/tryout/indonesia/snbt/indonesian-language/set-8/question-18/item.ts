import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Daftar peminjaman menunjukkan alasan setiap peserta memilih buku sehingga catatan fasilitator tidak menambah informasi.",
        },
        {
          isCorrect: false,
          label:
            "Catatan fasilitator harus menjadi dasar utama karena kesulitan peserta lebih penting daripada pilihan bacaan.",
        },
        {
          isCorrect: false,
          label:
            "Jika pilihan buku meningkat, kedua sumber membuktikan bahwa semua kesulitan membaca telah teratasi.",
        },
        {
          isCorrect: true,
          label:
            "Daftar peminjaman menunjukkan pilihan buku, sedangkan catatan fasilitator memberi konteks tentang kesulitan peserta; keduanya membantu membaca perkembangan kebiasaan, tetapi catatan fasilitator tetap merupakan sudut pandang pengamat.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan bentuk sumber membuat data peminjaman dan catatan percakapan tidak dapat dibandingkan sama sekali.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
