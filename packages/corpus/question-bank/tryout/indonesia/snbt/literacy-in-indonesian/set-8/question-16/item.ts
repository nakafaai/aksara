import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Siswa menghubungkan perubahan pola peminjaman dengan beberapa catatan peserta, tetapi membatasi simpulan karena cakupan arsip dan sudut pandang fasilitator tidak lengkap.",
        },
        {
          correct: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang klub pembaca pemula untuk menyusun penjelasan yang final dan dianggap berlaku untuk semua masa.",
        },
        {
          correct: false,
          label:
            "Siswa menyamakan daftar peminjaman dengan bukti bahwa setiap buku telah selesai dibaca dan dipahami oleh peminjamnya.",
        },
        {
          correct: false,
          label:
            "Siswa mengutamakan catatan fasilitator karena sumber berbentuk narasi selalu lebih lengkap daripada daftar administratif.",
        },
        {
          correct: false,
          label:
            "Siswa menyatakan jadwal malam sebagai penyebab peningkatan kebiasaan membaca setelah menemukan dua pola yang terjadi berdekatan.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
