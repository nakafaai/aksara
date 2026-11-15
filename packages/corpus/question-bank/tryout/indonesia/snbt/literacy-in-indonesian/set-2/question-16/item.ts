import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Harga ikan di Karangsari anjlok pada Februari, karena harga rata-rata seluruh ikan turun Rp$$2{.}000$$ per kilogram." },
        { correct: false, label: "Nelayan Karangsari lebih sejahtera pada Februari, karena nilai lelang total naik Rp$$200$$ juta dibanding Januari." },
        { correct: false, label: "Harga setiap jenis ikan naik dengan persentase yang sama, sehingga harga rata-rata seluruh ikan juga ikut naik pada Februari." },
        { correct: true, label: "Harga setiap jenis ikan naik, tetapi harga rata-rata seluruh ikan turun karena teri yang murah menjadi bagian terberat." },
        { correct: false, label: "Harga teri naik paling tinggi di antara ketiga jenis, sehingga teri menyumbang nilai lelang terbesar pada Februari." },
      ],
    },
  },
};

export default item;
