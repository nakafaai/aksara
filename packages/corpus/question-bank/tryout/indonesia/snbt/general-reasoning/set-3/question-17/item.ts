import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Viele junge Berufstätige bevorzugen ein Zimmer nahe der Arbeit, selbst wenn die Miete etwas höher ist.",
        },
        {
          isCorrect: false,
          label:
            "Eine niedrige Miete und ein kurzer Arbeitsweg machen ein Mietzimmer für Interessierte attraktiver.",
        },
        {
          isCorrect: true,
          label:
            "In vielen Bürovierteln ist der Mietaufschlag in Arbeitsplatznähe höher als die zusätzlichen Fahrtkosten eines weiter entfernten Zimmers, sodass die entfernte Wahl insgesamt weniger kostet.",
        },
        {
          isCorrect: false,
          label:
            "Junge Berufstätige vergleichen Miete und Fahrtkosten, wenn sie ihre monatlichen Gesamtkosten berechnen.",
        },
        {
          isCorrect: false,
          label:
            "Ein kürzerer Arbeitsweg verringert sowohl die Fahrzeit als auch die Zahl der zu zahlenden Fahrten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Many young workers prefer a room near work even when its rent is slightly higher.",
        },
        {
          isCorrect: false,
          label:
            "Low rent and a short commute make a rented room more attractive to prospective tenants.",
        },
        {
          isCorrect: true,
          label:
            "In many office districts, the rent premium near work is larger than the extra transport cost from a more distant room, so the distant option has a lower total monthly cost.",
        },
        {
          isCorrect: false,
          label:
            "Young workers compare rent and transport when estimating their total monthly cost.",
        },
        {
          isCorrect: false,
          label:
            "A shorter commute reduces both travel time and the number of transport fares paid.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Banyak pekerja muda memilih kos dekat tempat kerja meskipun sewanya sedikit lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Sewa murah dan perjalanan singkat membuat kamar kos lebih menarik bagi calon penghuni.",
        },
        {
          isCorrect: true,
          label:
            "Di banyak kawasan perkantoran, selisih sewa kos dekat tempat kerja lebih besar daripada tambahan ongkos transportasi dari kos yang lebih jauh, sehingga biaya bulanan total kos jauh justru lebih rendah.",
        },
        {
          isCorrect: false,
          label:
            "Pekerja muda membandingkan biaya sewa dan transportasi saat menghitung biaya bulanan total.",
        },
        {
          isCorrect: false,
          label:
            "Perjalanan yang lebih singkat mengurangi waktu tempuh dan jumlah ongkos transportasi yang dibayar.",
        },
      ],
    },
  },
};

export default item;
