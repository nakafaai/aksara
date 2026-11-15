import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Teks B menolak data itu, karena menganggap nilai SMA Harapan Bangsa tidak benar-benar naik dan hanya dilaporkan naik oleh guru." },
        { correct: false, label: "Teks B menerima data itu sebagai bukti manfaat larangan, tetapi menilai kenaikan $$6$$ poin terlalu kecil untuk mengubah kebijakan sekolah lain." },
        { correct: false, label: "Teks B memakai data SMA Pelita untuk membuktikan bahwa larangan ponsel sama sekali tidak berpengaruh pada nilai siswa di sekolah mana pun." },
        { correct: true, label: "Teks B menerima bahwa nilai naik, tetapi memakai sekolah pembanding untuk menunjukkan sebagian besar kenaikan itu mungkin berasal dari hal lain." },
        { correct: false, label: "Teks B menunjukkan bahwa pergantian format ujian hanya menaikkan nilai SMA Harapan Bangsa, bukan sekolah lain di kabupaten yang sama." },
      ],
    },
  },
};

export default item;
