declare module "jsforce" {
  class Connection {
    constructor(options?: Record<string, unknown>);
    query(soql: string): Promise<{ totalSize: number; done: boolean; records: Record<string, unknown>[] }>;
    sobject(name: string): { create(data: Record<string, unknown>): Promise<Record<string, unknown>> };
    login(username: string, password: string): Promise<unknown>;
  }
  const jsforce: { Connection: typeof Connection };
  export default jsforce;
}

declare module "jsforce/lib/connection" {
  import jsforce from "jsforce";
  type Connection = jsforce.Connection;
  export default Connection;
}
