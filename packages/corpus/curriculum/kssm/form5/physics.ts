import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Physics chapters, in the order of their DSKP. */
export const kssmForm5PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-physics-force-and-motion-ii-vector",
        level: "lesson",
        materialKeys: ["lesson.physics.vector"],
        order: 10,
      }),
    ],
    key: "form-5-physics-force-and-motion-ii",
    materialCard: {
      de: {
        description: "Addiere Kräfte als Vektoren und finde die Resultierende.",
        title: "Kraft und Bewegung II",
      },
      en: {
        description: "Add forces as vectors and find their resultant.",
        title: "Force and Motion II",
      },
      id: {
        description: "Jumlahkan gaya sebagai vektor dan cari resultannya.",
        title: "Gaya dan Gerak II",
      },
      ms: {
        description: "Tambah daya sebagai vektor dan cari daya paduannya.",
        title: "Daya dan Gerakan II",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "kraft-und-bewegung-ii",
        title: "Kraft und Bewegung II",
      },
      en: { routeSlug: "force-and-motion-ii", title: "Force and Motion II" },
      id: { routeSlug: "gaya-dan-gerak-ii", title: "Gaya dan Gerak II" },
      ms: { routeSlug: "daya-dan-gerakan-ii", title: "Daya dan Gerakan II" },
    },
  }),
  unitNode({
    key: "form-5-physics-pressure",
    order: 20,
    translations: {
      de: { routeSlug: "druck", title: "Druck" },
      en: { routeSlug: "pressure", title: "Pressure" },
      id: { routeSlug: "tekanan", title: "Tekanan" },
      ms: { routeSlug: "tekanan", title: "Tekanan" },
    },
  }),
  unitNode({
    key: "form-5-physics-electricity",
    order: 30,
    translations: {
      de: { routeSlug: "elektrizitaet", title: "Elektrizität" },
      en: { routeSlug: "electricity", title: "Electricity" },
      id: { routeSlug: "listrik", title: "Listrik" },
      ms: { routeSlug: "elektrik", title: "Elektrik" },
    },
  }),
  unitNode({
    key: "form-5-physics-electromagnetism",
    order: 40,
    translations: {
      de: { routeSlug: "elektromagnetismus", title: "Elektromagnetismus" },
      en: { routeSlug: "electromagnetism", title: "Electromagnetism" },
      id: { routeSlug: "elektromagnetisme", title: "Elektromagnetisme" },
      ms: { routeSlug: "keelektromagnetan", title: "Keelektromagnetan" },
    },
  }),
  unitNode({
    key: "form-5-physics-electronics",
    order: 50,
    translations: {
      de: { routeSlug: "elektronik", title: "Elektronik" },
      en: { routeSlug: "electronics", title: "Electronics" },
      id: { routeSlug: "elektronika", title: "Elektronika" },
      ms: { routeSlug: "elektronik", title: "Elektronik" },
    },
  }),
  unitNode({
    key: "form-5-physics-nuclear-physics",
    order: 60,
    translations: {
      de: { routeSlug: "kernphysik", title: "Kernphysik" },
      en: { routeSlug: "nuclear-physics", title: "Nuclear Physics" },
      id: { routeSlug: "fisika-inti", title: "Fisika Inti" },
      ms: { routeSlug: "fizik-nuklear", title: "Fizik Nuklear" },
    },
  }),
  unitNode({
    key: "form-5-physics-quantum-physics",
    order: 70,
    translations: {
      de: { routeSlug: "quantenphysik", title: "Quantenphysik" },
      en: { routeSlug: "quantum-physics", title: "Quantum Physics" },
      id: { routeSlug: "fisika-kuantum", title: "Fisika Kuantum" },
      ms: { routeSlug: "fizik-kuantum", title: "Fizik Kuantum" },
    },
  }),
];
