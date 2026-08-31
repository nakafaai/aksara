import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Vorteile digitaler Zahlungen müssen mit vergleichbaren Daten und unter Berücksichtigung des Zugangs bewertet werden; ihre Ergänzung rechtfertigt nicht automatisch die Abschaffung von Bargeld.",
        },
        {
          isCorrect: false,
          label:
            "Die Transaktionsdauer kann von der Warenart und nicht nur von der Zahlungsweise abhängen.",
        },
        {
          isCorrect: true,
          label:
            "Nach der Aufteilung der Daten verschwand der Zeitvorteil bei großen Einkäufen fast vollständig.",
        },
        {
          isCorrect: false,
          label:
            "Im nächsten Test wird das Netz verbessert und werden Einkäufe mit ähnlicher Artikelzahl verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Digitale Zahlung ist nachweislich immer schneller und sollte Bargeld auf jedem Markt ersetzen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Digital payment benefits must be judged with comparable data and user access, so adding it does not automatically justify removing cash.",
        },
        {
          isCorrect: false,
          label:
            "Transaction time may depend on the type of goods rather than only on payment method.",
        },
        {
          isCorrect: true,
          label:
            "After the data were separated, the time advantage nearly disappeared for transactions with many items.",
        },
        {
          isCorrect: false,
          label:
            "The next test will improve the network and compare purchases with similar item counts.",
        },
        {
          isCorrect: false,
          label:
            "Digital payment is proven always faster and should replace cash in every market.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Manfaat pembayaran digital perlu dinilai dengan data yang sebanding dan akses pengguna, sehingga penambahannya tidak otomatis berarti penghapusan tunai.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan waktu transaksi dapat dipengaruhi jenis barang dan bukan hanya cara pembayaran.",
        },
        {
          isCorrect: true,
          label:
            "Setelah data dipisahkan, keunggulan waktu hampir hilang pada transaksi dengan banyak barang.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
