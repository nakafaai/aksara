import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableHashMap,
  Option,
  Order,
  Path,
  Schema,
} from "effect";

const ManifestSchema = Schema.fromJsonString(
  Schema.Struct({
    license: Schema.String,
    name: Schema.String,
    version: Schema.String,
  })
);
const LICENSE_PATTERN = /^licen[cs]e(?:[.-]|$)/iu;

/** A bundled dependency cannot provide complete license evidence. */
export class NoticeError extends Schema.TaggedError<NoticeError>()(
  "NoticeError",
  {
    cause: Schema.Unknown,
    path: Schema.String,
    stage: Schema.Literals(["license", "manifest"]),
  }
) {}

const PackageLocationSchema = Schema.Struct({
  name: Schema.String,
  root: Schema.String,
});
type PackageLocation = typeof PackageLocationSchema.Type;

/** Finds the closest installed package that owns one bundle input. */
const packageLocation = (input: string, root: string, path: Path.Path) => {
  const absolute = path.resolve(root, input);
  const matches = [
    ...absolute.matchAll(
      /[/\\]node_modules[/\\]((?:@[^/\\]+[/\\])?[^/\\]+)[/\\]/gu
    ),
  ];
  const match = Arr.last(matches);
  if (Option.isNone(match)) {
    return;
  }
  const name = match.value[1]?.replaceAll("\\", "/");
  if (name === undefined) {
    return;
  }
  const end = (match.value.index ?? 0) + match.value[0].length - 1;
  return {
    name,
    root: absolute.slice(0, end),
  } satisfies PackageLocation;
};

/** Reads one exact installed package manifest and all of its license files. */
const readNotice = Effect.fn("AksaraCliNotice.read")(function* (
  location: PackageLocation
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestPath = path.join(location.root, "package.json");
  const manifestSource = yield* fileSystem
    .readFileString(manifestPath)
    .pipe(
      Effect.mapError(
        (cause) =>
          new NoticeError({ cause, path: manifestPath, stage: "manifest" })
      )
    );
  const manifest = yield* Schema.decodeEffect(ManifestSchema)(
    manifestSource
  ).pipe(
    Effect.mapError(
      (cause) =>
        new NoticeError({ cause, path: manifestPath, stage: "manifest" })
    )
  );
  if (manifest.name !== location.name) {
    return yield* new NoticeError({
      cause: `Expected ${location.name}, received ${manifest.name}`,
      path: manifestPath,
      stage: "manifest",
    });
  }
  const entries = yield* fileSystem
    .readDirectory(location.root)
    .pipe(
      Effect.mapError(
        (cause) =>
          new NoticeError({ cause, path: location.root, stage: "license" })
      )
    );
  const licenseFiles = Arr.sort(
    Arr.filter(entries, (entry) => LICENSE_PATTERN.test(entry)),
    Order.String
  );
  if (licenseFiles.length === 0) {
    return yield* new NoticeError({
      cause: "No license file found",
      path: location.root,
      stage: "license",
    });
  }
  const licenses = yield* Effect.forEach(licenseFiles, (entry) => {
    const licensePath = path.join(location.root, entry);
    return fileSystem
      .readFileString(licensePath)
      .pipe(
        Effect.mapError(
          (cause) =>
            new NoticeError({ cause, path: licensePath, stage: "license" })
        )
      );
  });
  return {
    license: manifest.license,
    licenses,
    name: manifest.name,
    version: manifest.version,
  };
});

/** Orders notices by package name and version with the locale collation of their keys. */
const compareNotices = Order.make<{
  readonly name: string;
  readonly version: string;
}>((left, right) => {
  const order = `${left.name}@${left.version}`.localeCompare(
    `${right.name}@${right.version}`
  );
  if (order < 0) {
    return -1;
  }
  return order > 0 ? 1 : 0;
});

/** Generates complete notices from the exact third-party bundle inputs. */
export const generateBundledNotice = Effect.fn("AksaraCliNotice.generate")(
  function* (inputs: readonly string[], root: string) {
    const path = yield* Path.Path;
    const locations = MutableHashMap.empty<string, PackageLocation>();
    for (const input of inputs) {
      const location = packageLocation(input, root, path);
      if (location !== undefined) {
        MutableHashMap.set(locations, location.root, location);
      }
    }
    const notices = yield* Effect.forEach(
      [...MutableHashMap.values(locations)],
      readNotice,
      {
        concurrency: "unbounded",
      }
    );
    const sections = Arr.map(
      Arr.sort(notices, compareNotices),
      (notice) =>
        `${notice.name} ${notice.version}\nLicense: ${notice.license}\n\n${Arr.join(
          Arr.map(notice.licenses, (license) => license.trim()),
          "\n\n"
        )}`
    );
    return `Bundled dependency notices\n\nThis file is generated from the exact esbuild bundle inputs.\n\n${Arr.join(
      sections,
      "\n\n================================================================\n\n"
    )}\n`;
  }
);
