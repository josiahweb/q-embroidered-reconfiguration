type ConstructorType<T extends abstract new (...args: never) => unknown> = new (
  ...params: ConstructorParameters<T>
) => InstanceType<T>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

interface Manifest {
  bundles: Bundle[];
}

interface Bundle {
  name: string;
  assets: Asset[];
}

interface Asset {
  alias: string[];
  src: string[];
  data?: Data;
}

interface Data {
  tags: Tags;
}

interface Tags {
  m: boolean;
}
