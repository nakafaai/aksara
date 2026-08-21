import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jedes zugelassene pflanzliche Arzneimittel heilt nachweislich Krankheiten.",
      value: false,
    },
    {
      label:
        "Eine Verkehrszulassung garantiert, dass ein pflanzliches Arzneimittel für jede Person und jede Erkrankung geeignet ist.",
      value: false,
    },
    {
      label:
        "Nach der Zulassung eines pflanzlichen Arzneimittels müssen Verbraucher die Kennzeichnung nicht mehr prüfen.",
      value: false,
    },
    {
      label:
        "Die staatliche Überwachung endet, sobald ein pflanzliches Arzneimittel zugelassen wurde.",
      value: false,
    },
    {
      label:
        "Vertrieb und Anwendung pflanzlicher Arzneimittel hängen von behördlicher Prüfung und fortlaufender Überwachung ab.",
      value: true,
    },
  ],
  en: [
    {
      label: "Every authorized herbal product is proven to cure disease.",
      value: false,
    },
    {
      label:
        "A marketing authorization guarantees that a herbal product is suitable for every person and condition.",
      value: false,
    },
    {
      label:
        "Consumers no longer need to check the label once a herbal product has a marketing authorization.",
      value: false,
    },
    {
      label:
        "Government supervision ends as soon as a herbal product receives a marketing authorization.",
      value: false,
    },
    {
      label:
        "The circulation and use of herbal products depend on regulatory evaluation and continuing supervision.",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Setiap produk herbal berizin edar terbukti dapat menyembuhkan penyakit.",
      value: false,
    },
    {
      label:
        "Izin edar menjamin bahwa suatu produk herbal cocok untuk setiap orang dan setiap kondisi.",
      value: false,
    },
    {
      label:
        "Konsumen tidak perlu lagi memeriksa label setelah suatu produk herbal memperoleh izin edar.",
      value: false,
    },
    {
      label:
        "Pengawasan pemerintah berakhir begitu suatu produk herbal memperoleh izin edar.",
      value: false,
    },
    {
      label:
        "Peredaran dan penggunaan produk herbal bergantung pada penilaian regulator serta pengawasan yang berkelanjutan.",
      value: true,
    },
  ],
};

export default choices;
