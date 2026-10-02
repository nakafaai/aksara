import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa menghubungkan perubahan pola peminjaman dengan beberapa catatan peserta, tetapi membatasi simpulan karena cakupan arsip dan sudut pandang fasilitator tidak lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang klub pembaca pemula untuk menyusun penjelasan yang final dan dianggap berlaku untuk semua masa.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menyamakan daftar peminjaman dengan bukti bahwa setiap buku telah selesai dibaca dan dipahami oleh peminjamnya.",
        },
        {
          isCorrect: false,
          label:
            "Siswa mengutamakan catatan fasilitator karena sumber berbentuk narasi selalu lebih lengkap daripada daftar administratif.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menyatakan jadwal malam sebagai penyebab peningkatan kebiasaan membaca setelah menemukan dua pola yang terjadi berdekatan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
