
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model LoyaltyProgram
 * 
 */
export type LoyaltyProgram = $Result.DefaultSelection<Prisma.$LoyaltyProgramPayload>
/**
 * Model LoyaltyCard
 * 
 */
export type LoyaltyCard = $Result.DefaultSelection<Prisma.$LoyaltyCardPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model LoyaltyPlan
 * 
 */
export type LoyaltyPlan = $Result.DefaultSelection<Prisma.$LoyaltyPlanPayload>
/**
 * Model LoyaltyPlanItem
 * 
 */
export type LoyaltyPlanItem = $Result.DefaultSelection<Prisma.$LoyaltyPlanItemPayload>
/**
 * Model LoyaltySubscription
 * 
 */
export type LoyaltySubscription = $Result.DefaultSelection<Prisma.$LoyaltySubscriptionPayload>
/**
 * Model LoyaltyUsage
 * 
 */
export type LoyaltyUsage = $Result.DefaultSelection<Prisma.$LoyaltyUsagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const AppointmentType: {
  ONLINE: 'ONLINE',
  MANUAL: 'MANUAL'
};

export type AppointmentType = (typeof AppointmentType)[keyof typeof AppointmentType]


export const TransactionType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  COMMISSION: 'COMMISSION'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const NotificationType: {
  BOOKING_CONFIRMATION: 'BOOKING_CONFIRMATION',
  BOOKING_REMINDER: 'BOOKING_REMINDER',
  BOOKING_CANCELLATION: 'BOOKING_CANCELLATION',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  SYSTEM: 'SYSTEM'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const LoyaltyPlanInterval: {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
};

export type LoyaltyPlanInterval = (typeof LoyaltyPlanInterval)[keyof typeof LoyaltyPlanInterval]

}

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type AppointmentType = $Enums.AppointmentType

export const AppointmentType: typeof $Enums.AppointmentType

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type LoyaltyPlanInterval = $Enums.LoyaltyPlanInterval

export const LoyaltyPlanInterval: typeof $Enums.LoyaltyPlanInterval

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Services
 * const services = await prisma.service.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Services
   * const services = await prisma.service.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyProgram`: Exposes CRUD operations for the **LoyaltyProgram** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyPrograms
    * const loyaltyPrograms = await prisma.loyaltyProgram.findMany()
    * ```
    */
  get loyaltyProgram(): Prisma.LoyaltyProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyCard`: Exposes CRUD operations for the **LoyaltyCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyCards
    * const loyaltyCards = await prisma.loyaltyCard.findMany()
    * ```
    */
  get loyaltyCard(): Prisma.LoyaltyCardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyPlan`: Exposes CRUD operations for the **LoyaltyPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyPlans
    * const loyaltyPlans = await prisma.loyaltyPlan.findMany()
    * ```
    */
  get loyaltyPlan(): Prisma.LoyaltyPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyPlanItem`: Exposes CRUD operations for the **LoyaltyPlanItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyPlanItems
    * const loyaltyPlanItems = await prisma.loyaltyPlanItem.findMany()
    * ```
    */
  get loyaltyPlanItem(): Prisma.LoyaltyPlanItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltySubscription`: Exposes CRUD operations for the **LoyaltySubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltySubscriptions
    * const loyaltySubscriptions = await prisma.loyaltySubscription.findMany()
    * ```
    */
  get loyaltySubscription(): Prisma.LoyaltySubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loyaltyUsage`: Exposes CRUD operations for the **LoyaltyUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoyaltyUsages
    * const loyaltyUsages = await prisma.loyaltyUsage.findMany()
    * ```
    */
  get loyaltyUsage(): Prisma.LoyaltyUsageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Service: 'Service',
    Appointment: 'Appointment',
    Product: 'Product',
    Transaction: 'Transaction',
    LoyaltyProgram: 'LoyaltyProgram',
    LoyaltyCard: 'LoyaltyCard',
    Notification: 'Notification',
    LoyaltyPlan: 'LoyaltyPlan',
    LoyaltyPlanItem: 'LoyaltyPlanItem',
    LoyaltySubscription: 'LoyaltySubscription',
    LoyaltyUsage: 'LoyaltyUsage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "service" | "appointment" | "product" | "transaction" | "loyaltyProgram" | "loyaltyCard" | "notification" | "loyaltyPlan" | "loyaltyPlanItem" | "loyaltySubscription" | "loyaltyUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyProgram: {
        payload: Prisma.$LoyaltyProgramPayload<ExtArgs>
        fields: Prisma.LoyaltyProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          findMany: {
            args: Prisma.LoyaltyProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>[]
          }
          create: {
            args: Prisma.LoyaltyProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          createMany: {
            args: Prisma.LoyaltyProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          update: {
            args: Prisma.LoyaltyProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyProgramUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyProgramPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyProgram>
          }
          groupBy: {
            args: Prisma.LoyaltyProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyProgramCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyProgramCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyCard: {
        payload: Prisma.$LoyaltyCardPayload<ExtArgs>
        fields: Prisma.LoyaltyCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          findMany: {
            args: Prisma.LoyaltyCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>[]
          }
          create: {
            args: Prisma.LoyaltyCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          createMany: {
            args: Prisma.LoyaltyCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          update: {
            args: Prisma.LoyaltyCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyCardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyCardPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyCard>
          }
          groupBy: {
            args: Prisma.LoyaltyCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyCardCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyCardCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyPlan: {
        payload: Prisma.$LoyaltyPlanPayload<ExtArgs>
        fields: Prisma.LoyaltyPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          findMany: {
            args: Prisma.LoyaltyPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>[]
          }
          create: {
            args: Prisma.LoyaltyPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          createMany: {
            args: Prisma.LoyaltyPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          update: {
            args: Prisma.LoyaltyPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyPlan>
          }
          groupBy: {
            args: Prisma.LoyaltyPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyPlanCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyPlanCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyPlanItem: {
        payload: Prisma.$LoyaltyPlanItemPayload<ExtArgs>
        fields: Prisma.LoyaltyPlanItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyPlanItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyPlanItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          findFirst: {
            args: Prisma.LoyaltyPlanItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyPlanItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          findMany: {
            args: Prisma.LoyaltyPlanItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>[]
          }
          create: {
            args: Prisma.LoyaltyPlanItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          createMany: {
            args: Prisma.LoyaltyPlanItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyPlanItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>[]
          }
          delete: {
            args: Prisma.LoyaltyPlanItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          update: {
            args: Prisma.LoyaltyPlanItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyPlanItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyPlanItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyPlanItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyPlanItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyPlanItemPayload>
          }
          aggregate: {
            args: Prisma.LoyaltyPlanItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyPlanItem>
          }
          groupBy: {
            args: Prisma.LoyaltyPlanItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyPlanItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyPlanItemCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyPlanItemCountAggregateOutputType> | number
          }
        }
      }
      LoyaltySubscription: {
        payload: Prisma.$LoyaltySubscriptionPayload<ExtArgs>
        fields: Prisma.LoyaltySubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltySubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltySubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          findFirst: {
            args: Prisma.LoyaltySubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltySubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          findMany: {
            args: Prisma.LoyaltySubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>[]
          }
          create: {
            args: Prisma.LoyaltySubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          createMany: {
            args: Prisma.LoyaltySubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltySubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>[]
          }
          delete: {
            args: Prisma.LoyaltySubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          update: {
            args: Prisma.LoyaltySubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.LoyaltySubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltySubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltySubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.LoyaltySubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltySubscriptionPayload>
          }
          aggregate: {
            args: Prisma.LoyaltySubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltySubscription>
          }
          groupBy: {
            args: Prisma.LoyaltySubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltySubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltySubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltySubscriptionCountAggregateOutputType> | number
          }
        }
      }
      LoyaltyUsage: {
        payload: Prisma.$LoyaltyUsagePayload<ExtArgs>
        fields: Prisma.LoyaltyUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoyaltyUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoyaltyUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          findFirst: {
            args: Prisma.LoyaltyUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoyaltyUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          findMany: {
            args: Prisma.LoyaltyUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>[]
          }
          create: {
            args: Prisma.LoyaltyUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          createMany: {
            args: Prisma.LoyaltyUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoyaltyUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>[]
          }
          delete: {
            args: Prisma.LoyaltyUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          update: {
            args: Prisma.LoyaltyUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          deleteMany: {
            args: Prisma.LoyaltyUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoyaltyUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoyaltyUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>[]
          }
          upsert: {
            args: Prisma.LoyaltyUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoyaltyUsagePayload>
          }
          aggregate: {
            args: Prisma.LoyaltyUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoyaltyUsage>
          }
          groupBy: {
            args: Prisma.LoyaltyUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoyaltyUsageCountArgs<ExtArgs>
            result: $Utils.Optional<LoyaltyUsageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    service?: ServiceOmit
    appointment?: AppointmentOmit
    product?: ProductOmit
    transaction?: TransactionOmit
    loyaltyProgram?: LoyaltyProgramOmit
    loyaltyCard?: LoyaltyCardOmit
    notification?: NotificationOmit
    loyaltyPlan?: LoyaltyPlanOmit
    loyaltyPlanItem?: LoyaltyPlanItemOmit
    loyaltySubscription?: LoyaltySubscriptionOmit
    loyaltyUsage?: LoyaltyUsageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    appointments: number
    loyaltyPlanItems: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | ServiceCountOutputTypeCountAppointmentsArgs
    loyaltyPlanItems?: boolean | ServiceCountOutputTypeCountLoyaltyPlanItemsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountLoyaltyPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyPlanItemWhereInput
  }


  /**
   * Count Type LoyaltyProgramCountOutputType
   */

  export type LoyaltyProgramCountOutputType = {
    cards: number
  }

  export type LoyaltyProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | LoyaltyProgramCountOutputTypeCountCardsArgs
  }

  // Custom InputTypes
  /**
   * LoyaltyProgramCountOutputType without action
   */
  export type LoyaltyProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgramCountOutputType
     */
    select?: LoyaltyProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoyaltyProgramCountOutputType without action
   */
  export type LoyaltyProgramCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyCardWhereInput
  }


  /**
   * Count Type LoyaltyPlanCountOutputType
   */

  export type LoyaltyPlanCountOutputType = {
    items: number
    subscriptions: number
  }

  export type LoyaltyPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | LoyaltyPlanCountOutputTypeCountItemsArgs
    subscriptions?: boolean | LoyaltyPlanCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * LoyaltyPlanCountOutputType without action
   */
  export type LoyaltyPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanCountOutputType
     */
    select?: LoyaltyPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoyaltyPlanCountOutputType without action
   */
  export type LoyaltyPlanCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyPlanItemWhereInput
  }

  /**
   * LoyaltyPlanCountOutputType without action
   */
  export type LoyaltyPlanCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltySubscriptionWhereInput
  }


  /**
   * Count Type LoyaltySubscriptionCountOutputType
   */

  export type LoyaltySubscriptionCountOutputType = {
    usages: number
  }

  export type LoyaltySubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usages?: boolean | LoyaltySubscriptionCountOutputTypeCountUsagesArgs
  }

  // Custom InputTypes
  /**
   * LoyaltySubscriptionCountOutputType without action
   */
  export type LoyaltySubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscriptionCountOutputType
     */
    select?: LoyaltySubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoyaltySubscriptionCountOutputType without action
   */
  export type LoyaltySubscriptionCountOutputTypeCountUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyUsageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: Decimal | null
    duration: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: Decimal | null
    duration: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    duration: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    duration: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    price: number
    duration: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    price: Decimal
    duration: number
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    loyaltyPlanItems?: boolean | Service$loyaltyPlanItemsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "price" | "duration" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    loyaltyPlanItems?: boolean | Service$loyaltyPlanItemsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      loyaltyPlanItems: Prisma.$LoyaltyPlanItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      price: Prisma.Decimal
      duration: number
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointments<T extends Service$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Service$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loyaltyPlanItems<T extends Service$loyaltyPlanItemsArgs<ExtArgs> = {}>(args?: Subset<T, Service$loyaltyPlanItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly tenantId: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Decimal'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly active: FieldRef<"Service", 'Boolean'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.appointments
   */
  export type Service$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Service.loyaltyPlanItems
   */
  export type Service$loyaltyPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    where?: LoyaltyPlanItemWhereInput
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    cursor?: LoyaltyPlanItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltyPlanItemScalarFieldEnum | LoyaltyPlanItemScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    platformFee: Decimal | null
    netAmount: Decimal | null
  }

  export type AppointmentSumAggregateOutputType = {
    platformFee: Decimal | null
    netAmount: Decimal | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    tenantSlug: string | null
    serviceId: string | null
    userId: string | null
    barberId: string | null
    barberName: string | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.AppointmentStatus | null
    type: $Enums.AppointmentType | null
    paymentIntentId: string | null
    platformFee: Decimal | null
    netAmount: Decimal | null
    notes: string | null
    bookingSource: string | null
    holdKind: string | null
    holdReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    tenantSlug: string | null
    serviceId: string | null
    userId: string | null
    barberId: string | null
    barberName: string | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.AppointmentStatus | null
    type: $Enums.AppointmentType | null
    paymentIntentId: string | null
    platformFee: Decimal | null
    netAmount: Decimal | null
    notes: string | null
    bookingSource: string | null
    holdKind: string | null
    holdReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    tenantId: number
    tenantSlug: number
    serviceId: number
    additionalServiceIds: number
    userId: number
    barberId: number
    barberName: number
    clientName: number
    clientEmail: number
    clientPhone: number
    startTime: number
    endTime: number
    status: number
    type: number
    paymentIntentId: number
    platformFee: number
    netAmount: number
    notes: number
    bookingSource: number
    holdKind: number
    holdReason: number
    comandaLines: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    platformFee?: true
    netAmount?: true
  }

  export type AppointmentSumAggregateInputType = {
    platformFee?: true
    netAmount?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    tenantId?: true
    tenantSlug?: true
    serviceId?: true
    userId?: true
    barberId?: true
    barberName?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    startTime?: true
    endTime?: true
    status?: true
    type?: true
    paymentIntentId?: true
    platformFee?: true
    netAmount?: true
    notes?: true
    bookingSource?: true
    holdKind?: true
    holdReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    tenantSlug?: true
    serviceId?: true
    userId?: true
    barberId?: true
    barberName?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    startTime?: true
    endTime?: true
    status?: true
    type?: true
    paymentIntentId?: true
    platformFee?: true
    netAmount?: true
    notes?: true
    bookingSource?: true
    holdKind?: true
    holdReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    tenantId?: true
    tenantSlug?: true
    serviceId?: true
    additionalServiceIds?: true
    userId?: true
    barberId?: true
    barberName?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    startTime?: true
    endTime?: true
    status?: true
    type?: true
    paymentIntentId?: true
    platformFee?: true
    netAmount?: true
    notes?: true
    bookingSource?: true
    holdKind?: true
    holdReason?: true
    comandaLines?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    tenantId: string
    tenantSlug: string
    serviceId: string
    additionalServiceIds: string[]
    userId: string | null
    barberId: string | null
    barberName: string | null
    clientName: string
    clientEmail: string | null
    clientPhone: string | null
    startTime: Date
    endTime: Date
    status: $Enums.AppointmentStatus
    type: $Enums.AppointmentType
    paymentIntentId: string | null
    platformFee: Decimal | null
    netAmount: Decimal | null
    notes: string | null
    bookingSource: string | null
    holdKind: string
    holdReason: string | null
    comandaLines: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    tenantSlug?: boolean
    serviceId?: boolean
    additionalServiceIds?: boolean
    userId?: boolean
    barberId?: boolean
    barberName?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    type?: boolean
    paymentIntentId?: boolean
    platformFee?: boolean
    netAmount?: boolean
    notes?: boolean
    bookingSource?: boolean
    holdKind?: boolean
    holdReason?: boolean
    comandaLines?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    loyaltyUsage?: boolean | Appointment$loyaltyUsageArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    tenantSlug?: boolean
    serviceId?: boolean
    additionalServiceIds?: boolean
    userId?: boolean
    barberId?: boolean
    barberName?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    type?: boolean
    paymentIntentId?: boolean
    platformFee?: boolean
    netAmount?: boolean
    notes?: boolean
    bookingSource?: boolean
    holdKind?: boolean
    holdReason?: boolean
    comandaLines?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    tenantSlug?: boolean
    serviceId?: boolean
    additionalServiceIds?: boolean
    userId?: boolean
    barberId?: boolean
    barberName?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    type?: boolean
    paymentIntentId?: boolean
    platformFee?: boolean
    netAmount?: boolean
    notes?: boolean
    bookingSource?: boolean
    holdKind?: boolean
    holdReason?: boolean
    comandaLines?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    tenantSlug?: boolean
    serviceId?: boolean
    additionalServiceIds?: boolean
    userId?: boolean
    barberId?: boolean
    barberName?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    type?: boolean
    paymentIntentId?: boolean
    platformFee?: boolean
    netAmount?: boolean
    notes?: boolean
    bookingSource?: boolean
    holdKind?: boolean
    holdReason?: boolean
    comandaLines?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "tenantSlug" | "serviceId" | "additionalServiceIds" | "userId" | "barberId" | "barberName" | "clientName" | "clientEmail" | "clientPhone" | "startTime" | "endTime" | "status" | "type" | "paymentIntentId" | "platformFee" | "netAmount" | "notes" | "bookingSource" | "holdKind" | "holdReason" | "comandaLines" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    loyaltyUsage?: boolean | Appointment$loyaltyUsageArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      loyaltyUsage: Prisma.$LoyaltyUsagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      tenantSlug: string
      serviceId: string
      /**
       * * Serviços extras no mesmo atendimento (só duração/preço agregados; principal continua em serviceId).
       */
      additionalServiceIds: string[]
      userId: string | null
      barberId: string | null
      barberName: string | null
      clientName: string
      clientEmail: string | null
      clientPhone: string | null
      startTime: Date
      endTime: Date
      status: $Enums.AppointmentStatus
      type: $Enums.AppointmentType
      paymentIntentId: string | null
      platformFee: Prisma.Decimal | null
      netAmount: Prisma.Decimal | null
      notes: string | null
      /**
       * * Canal/origem livre (ex.: App, Balcão, WhatsApp, Instagram) — uso interno da equipe.
       */
      bookingSource: string | null
      /**
       * * NONE | LEAVE | BLOCK — folga ou bloqueio na grade.
       */
      holdKind: string
      holdReason: string | null
      /**
       * * Comanda: [{ serviceId, barberId? }, ...] em sequência.
       */
      comandaLines: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    loyaltyUsage<T extends Appointment$loyaltyUsageArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$loyaltyUsageArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly tenantId: FieldRef<"Appointment", 'String'>
    readonly tenantSlug: FieldRef<"Appointment", 'String'>
    readonly serviceId: FieldRef<"Appointment", 'String'>
    readonly additionalServiceIds: FieldRef<"Appointment", 'String[]'>
    readonly userId: FieldRef<"Appointment", 'String'>
    readonly barberId: FieldRef<"Appointment", 'String'>
    readonly barberName: FieldRef<"Appointment", 'String'>
    readonly clientName: FieldRef<"Appointment", 'String'>
    readonly clientEmail: FieldRef<"Appointment", 'String'>
    readonly clientPhone: FieldRef<"Appointment", 'String'>
    readonly startTime: FieldRef<"Appointment", 'DateTime'>
    readonly endTime: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly type: FieldRef<"Appointment", 'AppointmentType'>
    readonly paymentIntentId: FieldRef<"Appointment", 'String'>
    readonly platformFee: FieldRef<"Appointment", 'Decimal'>
    readonly netAmount: FieldRef<"Appointment", 'Decimal'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly bookingSource: FieldRef<"Appointment", 'String'>
    readonly holdKind: FieldRef<"Appointment", 'String'>
    readonly holdReason: FieldRef<"Appointment", 'String'>
    readonly comandaLines: FieldRef<"Appointment", 'Json'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.loyaltyUsage
   */
  export type Appointment$loyaltyUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    where?: LoyaltyUsageWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    stock: number | null
    active: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    stock: number | null
    active: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    price: number
    stock: number
    active: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    active?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    active?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    active?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    price: Decimal
    stock: number
    active: boolean
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    active?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    active?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    active?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    active?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "price" | "stock" | "active" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      price: Prisma.Decimal
      stock: number
      active: boolean
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly tenantId: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly active: FieldRef<"Product", 'Boolean'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    description: string | null
    date: Date | null
    barberId: string | null
    appointmentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    description: string | null
    date: Date | null
    barberId: string | null
    appointmentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    tenantId: number
    type: number
    amount: number
    description: number
    date: number
    barberId: number
    appointmentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    barberId?: true
    appointmentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    barberId?: true
    appointmentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    amount?: true
    description?: true
    date?: true
    barberId?: true
    appointmentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    tenantId: string
    type: $Enums.TransactionType
    amount: Decimal
    description: string
    date: Date
    barberId: string | null
    appointmentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    barberId?: boolean
    appointmentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    barberId?: boolean
    appointmentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    barberId?: boolean
    appointmentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    date?: boolean
    barberId?: boolean
    appointmentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "type" | "amount" | "description" | "date" | "barberId" | "appointmentId" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      description: string
      date: Date
      barberId: string | null
      appointmentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly tenantId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly barberId: FieldRef<"Transaction", 'String'>
    readonly appointmentId: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
  }


  /**
   * Model LoyaltyProgram
   */

  export type AggregateLoyaltyProgram = {
    _count: LoyaltyProgramCountAggregateOutputType | null
    _avg: LoyaltyProgramAvgAggregateOutputType | null
    _sum: LoyaltyProgramSumAggregateOutputType | null
    _min: LoyaltyProgramMinAggregateOutputType | null
    _max: LoyaltyProgramMaxAggregateOutputType | null
  }

  export type LoyaltyProgramAvgAggregateOutputType = {
    pointsRequired: number | null
  }

  export type LoyaltyProgramSumAggregateOutputType = {
    pointsRequired: number | null
  }

  export type LoyaltyProgramMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    pointsRequired: number | null
    reward: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyProgramMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    pointsRequired: number | null
    reward: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyProgramCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    pointsRequired: number
    reward: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoyaltyProgramAvgAggregateInputType = {
    pointsRequired?: true
  }

  export type LoyaltyProgramSumAggregateInputType = {
    pointsRequired?: true
  }

  export type LoyaltyProgramMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    pointsRequired?: true
    reward?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyProgramMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    pointsRequired?: true
    reward?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyProgramCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    pointsRequired?: true
    reward?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoyaltyProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyProgram to aggregate.
     */
    where?: LoyaltyProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPrograms to fetch.
     */
    orderBy?: LoyaltyProgramOrderByWithRelationInput | LoyaltyProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyPrograms
    **/
    _count?: true | LoyaltyProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyProgramMaxAggregateInputType
  }

  export type GetLoyaltyProgramAggregateType<T extends LoyaltyProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyProgram[P]>
      : GetScalarType<T[P], AggregateLoyaltyProgram[P]>
  }




  export type LoyaltyProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyProgramWhereInput
    orderBy?: LoyaltyProgramOrderByWithAggregationInput | LoyaltyProgramOrderByWithAggregationInput[]
    by: LoyaltyProgramScalarFieldEnum[] | LoyaltyProgramScalarFieldEnum
    having?: LoyaltyProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyProgramCountAggregateInputType | true
    _avg?: LoyaltyProgramAvgAggregateInputType
    _sum?: LoyaltyProgramSumAggregateInputType
    _min?: LoyaltyProgramMinAggregateInputType
    _max?: LoyaltyProgramMaxAggregateInputType
  }

  export type LoyaltyProgramGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    pointsRequired: number
    reward: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: LoyaltyProgramCountAggregateOutputType | null
    _avg: LoyaltyProgramAvgAggregateOutputType | null
    _sum: LoyaltyProgramSumAggregateOutputType | null
    _min: LoyaltyProgramMinAggregateOutputType | null
    _max: LoyaltyProgramMaxAggregateOutputType | null
  }

  type GetLoyaltyProgramGroupByPayload<T extends LoyaltyProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyProgramGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyProgramGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    pointsRequired?: boolean
    reward?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cards?: boolean | LoyaltyProgram$cardsArgs<ExtArgs>
    _count?: boolean | LoyaltyProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyProgram"]>

  export type LoyaltyProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    pointsRequired?: boolean
    reward?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loyaltyProgram"]>

  export type LoyaltyProgramSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    pointsRequired?: boolean
    reward?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loyaltyProgram"]>

  export type LoyaltyProgramSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    pointsRequired?: boolean
    reward?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoyaltyProgramOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "pointsRequired" | "reward" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["loyaltyProgram"]>
  export type LoyaltyProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | LoyaltyProgram$cardsArgs<ExtArgs>
    _count?: boolean | LoyaltyProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoyaltyProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LoyaltyProgramIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LoyaltyProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyProgram"
    objects: {
      cards: Prisma.$LoyaltyCardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      pointsRequired: number
      reward: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loyaltyProgram"]>
    composites: {}
  }

  type LoyaltyProgramGetPayload<S extends boolean | null | undefined | LoyaltyProgramDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyProgramPayload, S>

  type LoyaltyProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyProgramCountAggregateInputType | true
    }

  export interface LoyaltyProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyProgram'], meta: { name: 'LoyaltyProgram' } }
    /**
     * Find zero or one LoyaltyProgram that matches the filter.
     * @param {LoyaltyProgramFindUniqueArgs} args - Arguments to find a LoyaltyProgram
     * @example
     * // Get one LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyProgramFindUniqueArgs>(args: SelectSubset<T, LoyaltyProgramFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyProgram that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyProgramFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyProgram
     * @example
     * // Get one LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyProgram that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramFindFirstArgs} args - Arguments to find a LoyaltyProgram
     * @example
     * // Get one LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyProgramFindFirstArgs>(args?: SelectSubset<T, LoyaltyProgramFindFirstArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyProgram that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramFindFirstOrThrowArgs} args - Arguments to find a LoyaltyProgram
     * @example
     * // Get one LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyPrograms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyPrograms
     * const loyaltyPrograms = await prisma.loyaltyProgram.findMany()
     * 
     * // Get first 10 LoyaltyPrograms
     * const loyaltyPrograms = await prisma.loyaltyProgram.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyProgramWithIdOnly = await prisma.loyaltyProgram.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyProgramFindManyArgs>(args?: SelectSubset<T, LoyaltyProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyProgram.
     * @param {LoyaltyProgramCreateArgs} args - Arguments to create a LoyaltyProgram.
     * @example
     * // Create one LoyaltyProgram
     * const LoyaltyProgram = await prisma.loyaltyProgram.create({
     *   data: {
     *     // ... data to create a LoyaltyProgram
     *   }
     * })
     * 
     */
    create<T extends LoyaltyProgramCreateArgs>(args: SelectSubset<T, LoyaltyProgramCreateArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyPrograms.
     * @param {LoyaltyProgramCreateManyArgs} args - Arguments to create many LoyaltyPrograms.
     * @example
     * // Create many LoyaltyPrograms
     * const loyaltyProgram = await prisma.loyaltyProgram.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyProgramCreateManyArgs>(args?: SelectSubset<T, LoyaltyProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyPrograms and returns the data saved in the database.
     * @param {LoyaltyProgramCreateManyAndReturnArgs} args - Arguments to create many LoyaltyPrograms.
     * @example
     * // Create many LoyaltyPrograms
     * const loyaltyProgram = await prisma.loyaltyProgram.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyPrograms and only return the `id`
     * const loyaltyProgramWithIdOnly = await prisma.loyaltyProgram.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyProgram.
     * @param {LoyaltyProgramDeleteArgs} args - Arguments to delete one LoyaltyProgram.
     * @example
     * // Delete one LoyaltyProgram
     * const LoyaltyProgram = await prisma.loyaltyProgram.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyProgram
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyProgramDeleteArgs>(args: SelectSubset<T, LoyaltyProgramDeleteArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyProgram.
     * @param {LoyaltyProgramUpdateArgs} args - Arguments to update one LoyaltyProgram.
     * @example
     * // Update one LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyProgramUpdateArgs>(args: SelectSubset<T, LoyaltyProgramUpdateArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyPrograms.
     * @param {LoyaltyProgramDeleteManyArgs} args - Arguments to filter LoyaltyPrograms to delete.
     * @example
     * // Delete a few LoyaltyPrograms
     * const { count } = await prisma.loyaltyProgram.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyProgramDeleteManyArgs>(args?: SelectSubset<T, LoyaltyProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyPrograms
     * const loyaltyProgram = await prisma.loyaltyProgram.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyProgramUpdateManyArgs>(args: SelectSubset<T, LoyaltyProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPrograms and returns the data updated in the database.
     * @param {LoyaltyProgramUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyPrograms.
     * @example
     * // Update many LoyaltyPrograms
     * const loyaltyProgram = await prisma.loyaltyProgram.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyPrograms and only return the `id`
     * const loyaltyProgramWithIdOnly = await prisma.loyaltyProgram.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyProgram.
     * @param {LoyaltyProgramUpsertArgs} args - Arguments to update or create a LoyaltyProgram.
     * @example
     * // Update or create a LoyaltyProgram
     * const loyaltyProgram = await prisma.loyaltyProgram.upsert({
     *   create: {
     *     // ... data to create a LoyaltyProgram
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyProgram we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyProgramUpsertArgs>(args: SelectSubset<T, LoyaltyProgramUpsertArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramCountArgs} args - Arguments to filter LoyaltyPrograms to count.
     * @example
     * // Count the number of LoyaltyPrograms
     * const count = await prisma.loyaltyProgram.count({
     *   where: {
     *     // ... the filter for the LoyaltyPrograms we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyProgramCountArgs>(
      args?: Subset<T, LoyaltyProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyProgramAggregateArgs>(args: Subset<T, LoyaltyProgramAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyProgramAggregateType<T>>

    /**
     * Group by LoyaltyProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyProgramGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyProgramGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyProgramGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyProgram model
   */
  readonly fields: LoyaltyProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyProgram.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cards<T extends LoyaltyProgram$cardsArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyProgram$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyProgram model
   */
  interface LoyaltyProgramFieldRefs {
    readonly id: FieldRef<"LoyaltyProgram", 'String'>
    readonly tenantId: FieldRef<"LoyaltyProgram", 'String'>
    readonly name: FieldRef<"LoyaltyProgram", 'String'>
    readonly pointsRequired: FieldRef<"LoyaltyProgram", 'Int'>
    readonly reward: FieldRef<"LoyaltyProgram", 'String'>
    readonly active: FieldRef<"LoyaltyProgram", 'Boolean'>
    readonly createdAt: FieldRef<"LoyaltyProgram", 'DateTime'>
    readonly updatedAt: FieldRef<"LoyaltyProgram", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyProgram findUnique
   */
  export type LoyaltyProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyProgram to fetch.
     */
    where: LoyaltyProgramWhereUniqueInput
  }

  /**
   * LoyaltyProgram findUniqueOrThrow
   */
  export type LoyaltyProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyProgram to fetch.
     */
    where: LoyaltyProgramWhereUniqueInput
  }

  /**
   * LoyaltyProgram findFirst
   */
  export type LoyaltyProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyProgram to fetch.
     */
    where?: LoyaltyProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPrograms to fetch.
     */
    orderBy?: LoyaltyProgramOrderByWithRelationInput | LoyaltyProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPrograms.
     */
    cursor?: LoyaltyProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPrograms.
     */
    distinct?: LoyaltyProgramScalarFieldEnum | LoyaltyProgramScalarFieldEnum[]
  }

  /**
   * LoyaltyProgram findFirstOrThrow
   */
  export type LoyaltyProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyProgram to fetch.
     */
    where?: LoyaltyProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPrograms to fetch.
     */
    orderBy?: LoyaltyProgramOrderByWithRelationInput | LoyaltyProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPrograms.
     */
    cursor?: LoyaltyProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPrograms.
     */
    distinct?: LoyaltyProgramScalarFieldEnum | LoyaltyProgramScalarFieldEnum[]
  }

  /**
   * LoyaltyProgram findMany
   */
  export type LoyaltyProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPrograms to fetch.
     */
    where?: LoyaltyProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPrograms to fetch.
     */
    orderBy?: LoyaltyProgramOrderByWithRelationInput | LoyaltyProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyPrograms.
     */
    cursor?: LoyaltyProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPrograms.
     */
    distinct?: LoyaltyProgramScalarFieldEnum | LoyaltyProgramScalarFieldEnum[]
  }

  /**
   * LoyaltyProgram create
   */
  export type LoyaltyProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyProgram.
     */
    data: XOR<LoyaltyProgramCreateInput, LoyaltyProgramUncheckedCreateInput>
  }

  /**
   * LoyaltyProgram createMany
   */
  export type LoyaltyProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyPrograms.
     */
    data: LoyaltyProgramCreateManyInput | LoyaltyProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyProgram createManyAndReturn
   */
  export type LoyaltyProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyPrograms.
     */
    data: LoyaltyProgramCreateManyInput | LoyaltyProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyProgram update
   */
  export type LoyaltyProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyProgram.
     */
    data: XOR<LoyaltyProgramUpdateInput, LoyaltyProgramUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyProgram to update.
     */
    where: LoyaltyProgramWhereUniqueInput
  }

  /**
   * LoyaltyProgram updateMany
   */
  export type LoyaltyProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyPrograms.
     */
    data: XOR<LoyaltyProgramUpdateManyMutationInput, LoyaltyProgramUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPrograms to update
     */
    where?: LoyaltyProgramWhereInput
    /**
     * Limit how many LoyaltyPrograms to update.
     */
    limit?: number
  }

  /**
   * LoyaltyProgram updateManyAndReturn
   */
  export type LoyaltyProgramUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyPrograms.
     */
    data: XOR<LoyaltyProgramUpdateManyMutationInput, LoyaltyProgramUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPrograms to update
     */
    where?: LoyaltyProgramWhereInput
    /**
     * Limit how many LoyaltyPrograms to update.
     */
    limit?: number
  }

  /**
   * LoyaltyProgram upsert
   */
  export type LoyaltyProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyProgram to update in case it exists.
     */
    where: LoyaltyProgramWhereUniqueInput
    /**
     * In case the LoyaltyProgram found by the `where` argument doesn't exist, create a new LoyaltyProgram with this data.
     */
    create: XOR<LoyaltyProgramCreateInput, LoyaltyProgramUncheckedCreateInput>
    /**
     * In case the LoyaltyProgram was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyProgramUpdateInput, LoyaltyProgramUncheckedUpdateInput>
  }

  /**
   * LoyaltyProgram delete
   */
  export type LoyaltyProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyProgram to delete.
     */
    where: LoyaltyProgramWhereUniqueInput
  }

  /**
   * LoyaltyProgram deleteMany
   */
  export type LoyaltyProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyPrograms to delete
     */
    where?: LoyaltyProgramWhereInput
    /**
     * Limit how many LoyaltyPrograms to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyProgram.cards
   */
  export type LoyaltyProgram$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    where?: LoyaltyCardWhereInput
    orderBy?: LoyaltyCardOrderByWithRelationInput | LoyaltyCardOrderByWithRelationInput[]
    cursor?: LoyaltyCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltyCardScalarFieldEnum | LoyaltyCardScalarFieldEnum[]
  }

  /**
   * LoyaltyProgram without action
   */
  export type LoyaltyProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyProgram
     */
    select?: LoyaltyProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyProgram
     */
    omit?: LoyaltyProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyProgramInclude<ExtArgs> | null
  }


  /**
   * Model LoyaltyCard
   */

  export type AggregateLoyaltyCard = {
    _count: LoyaltyCardCountAggregateOutputType | null
    _avg: LoyaltyCardAvgAggregateOutputType | null
    _sum: LoyaltyCardSumAggregateOutputType | null
    _min: LoyaltyCardMinAggregateOutputType | null
    _max: LoyaltyCardMaxAggregateOutputType | null
  }

  export type LoyaltyCardAvgAggregateOutputType = {
    points: number | null
  }

  export type LoyaltyCardSumAggregateOutputType = {
    points: number | null
  }

  export type LoyaltyCardMinAggregateOutputType = {
    id: string | null
    loyaltyProgramId: string | null
    userId: string | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyCardMaxAggregateOutputType = {
    id: string | null
    loyaltyProgramId: string | null
    userId: string | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyCardCountAggregateOutputType = {
    id: number
    loyaltyProgramId: number
    userId: number
    points: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoyaltyCardAvgAggregateInputType = {
    points?: true
  }

  export type LoyaltyCardSumAggregateInputType = {
    points?: true
  }

  export type LoyaltyCardMinAggregateInputType = {
    id?: true
    loyaltyProgramId?: true
    userId?: true
    points?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyCardMaxAggregateInputType = {
    id?: true
    loyaltyProgramId?: true
    userId?: true
    points?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyCardCountAggregateInputType = {
    id?: true
    loyaltyProgramId?: true
    userId?: true
    points?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoyaltyCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyCard to aggregate.
     */
    where?: LoyaltyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyCards to fetch.
     */
    orderBy?: LoyaltyCardOrderByWithRelationInput | LoyaltyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyCards
    **/
    _count?: true | LoyaltyCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyCardMaxAggregateInputType
  }

  export type GetLoyaltyCardAggregateType<T extends LoyaltyCardAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyCard[P]>
      : GetScalarType<T[P], AggregateLoyaltyCard[P]>
  }




  export type LoyaltyCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyCardWhereInput
    orderBy?: LoyaltyCardOrderByWithAggregationInput | LoyaltyCardOrderByWithAggregationInput[]
    by: LoyaltyCardScalarFieldEnum[] | LoyaltyCardScalarFieldEnum
    having?: LoyaltyCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyCardCountAggregateInputType | true
    _avg?: LoyaltyCardAvgAggregateInputType
    _sum?: LoyaltyCardSumAggregateInputType
    _min?: LoyaltyCardMinAggregateInputType
    _max?: LoyaltyCardMaxAggregateInputType
  }

  export type LoyaltyCardGroupByOutputType = {
    id: string
    loyaltyProgramId: string
    userId: string
    points: number
    createdAt: Date
    updatedAt: Date
    _count: LoyaltyCardCountAggregateOutputType | null
    _avg: LoyaltyCardAvgAggregateOutputType | null
    _sum: LoyaltyCardSumAggregateOutputType | null
    _min: LoyaltyCardMinAggregateOutputType | null
    _max: LoyaltyCardMaxAggregateOutputType | null
  }

  type GetLoyaltyCardGroupByPayload<T extends LoyaltyCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyCardGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyCardGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyaltyProgramId?: boolean
    userId?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyCard"]>

  export type LoyaltyCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyaltyProgramId?: boolean
    userId?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyCard"]>

  export type LoyaltyCardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loyaltyProgramId?: boolean
    userId?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyCard"]>

  export type LoyaltyCardSelectScalar = {
    id?: boolean
    loyaltyProgramId?: boolean
    userId?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoyaltyCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loyaltyProgramId" | "userId" | "points" | "createdAt" | "updatedAt", ExtArgs["result"]["loyaltyCard"]>
  export type LoyaltyCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }
  export type LoyaltyCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }
  export type LoyaltyCardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loyaltyProgram?: boolean | LoyaltyProgramDefaultArgs<ExtArgs>
  }

  export type $LoyaltyCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyCard"
    objects: {
      loyaltyProgram: Prisma.$LoyaltyProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loyaltyProgramId: string
      userId: string
      points: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loyaltyCard"]>
    composites: {}
  }

  type LoyaltyCardGetPayload<S extends boolean | null | undefined | LoyaltyCardDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyCardPayload, S>

  type LoyaltyCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyCardCountAggregateInputType | true
    }

  export interface LoyaltyCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyCard'], meta: { name: 'LoyaltyCard' } }
    /**
     * Find zero or one LoyaltyCard that matches the filter.
     * @param {LoyaltyCardFindUniqueArgs} args - Arguments to find a LoyaltyCard
     * @example
     * // Get one LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyCardFindUniqueArgs>(args: SelectSubset<T, LoyaltyCardFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyCardFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyCard
     * @example
     * // Get one LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyCardFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardFindFirstArgs} args - Arguments to find a LoyaltyCard
     * @example
     * // Get one LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyCardFindFirstArgs>(args?: SelectSubset<T, LoyaltyCardFindFirstArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardFindFirstOrThrowArgs} args - Arguments to find a LoyaltyCard
     * @example
     * // Get one LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyCardFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyCards
     * const loyaltyCards = await prisma.loyaltyCard.findMany()
     * 
     * // Get first 10 LoyaltyCards
     * const loyaltyCards = await prisma.loyaltyCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyCardWithIdOnly = await prisma.loyaltyCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyCardFindManyArgs>(args?: SelectSubset<T, LoyaltyCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyCard.
     * @param {LoyaltyCardCreateArgs} args - Arguments to create a LoyaltyCard.
     * @example
     * // Create one LoyaltyCard
     * const LoyaltyCard = await prisma.loyaltyCard.create({
     *   data: {
     *     // ... data to create a LoyaltyCard
     *   }
     * })
     * 
     */
    create<T extends LoyaltyCardCreateArgs>(args: SelectSubset<T, LoyaltyCardCreateArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyCards.
     * @param {LoyaltyCardCreateManyArgs} args - Arguments to create many LoyaltyCards.
     * @example
     * // Create many LoyaltyCards
     * const loyaltyCard = await prisma.loyaltyCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyCardCreateManyArgs>(args?: SelectSubset<T, LoyaltyCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyCards and returns the data saved in the database.
     * @param {LoyaltyCardCreateManyAndReturnArgs} args - Arguments to create many LoyaltyCards.
     * @example
     * // Create many LoyaltyCards
     * const loyaltyCard = await prisma.loyaltyCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyCards and only return the `id`
     * const loyaltyCardWithIdOnly = await prisma.loyaltyCard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyCardCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyCard.
     * @param {LoyaltyCardDeleteArgs} args - Arguments to delete one LoyaltyCard.
     * @example
     * // Delete one LoyaltyCard
     * const LoyaltyCard = await prisma.loyaltyCard.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyCard
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyCardDeleteArgs>(args: SelectSubset<T, LoyaltyCardDeleteArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyCard.
     * @param {LoyaltyCardUpdateArgs} args - Arguments to update one LoyaltyCard.
     * @example
     * // Update one LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyCardUpdateArgs>(args: SelectSubset<T, LoyaltyCardUpdateArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyCards.
     * @param {LoyaltyCardDeleteManyArgs} args - Arguments to filter LoyaltyCards to delete.
     * @example
     * // Delete a few LoyaltyCards
     * const { count } = await prisma.loyaltyCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyCardDeleteManyArgs>(args?: SelectSubset<T, LoyaltyCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyCards
     * const loyaltyCard = await prisma.loyaltyCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyCardUpdateManyArgs>(args: SelectSubset<T, LoyaltyCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyCards and returns the data updated in the database.
     * @param {LoyaltyCardUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyCards.
     * @example
     * // Update many LoyaltyCards
     * const loyaltyCard = await prisma.loyaltyCard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyCards and only return the `id`
     * const loyaltyCardWithIdOnly = await prisma.loyaltyCard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyCardUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyCardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyCard.
     * @param {LoyaltyCardUpsertArgs} args - Arguments to update or create a LoyaltyCard.
     * @example
     * // Update or create a LoyaltyCard
     * const loyaltyCard = await prisma.loyaltyCard.upsert({
     *   create: {
     *     // ... data to create a LoyaltyCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyCard we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyCardUpsertArgs>(args: SelectSubset<T, LoyaltyCardUpsertArgs<ExtArgs>>): Prisma__LoyaltyCardClient<$Result.GetResult<Prisma.$LoyaltyCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardCountArgs} args - Arguments to filter LoyaltyCards to count.
     * @example
     * // Count the number of LoyaltyCards
     * const count = await prisma.loyaltyCard.count({
     *   where: {
     *     // ... the filter for the LoyaltyCards we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyCardCountArgs>(
      args?: Subset<T, LoyaltyCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyCardAggregateArgs>(args: Subset<T, LoyaltyCardAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyCardAggregateType<T>>

    /**
     * Group by LoyaltyCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyCardGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyCard model
   */
  readonly fields: LoyaltyCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loyaltyProgram<T extends LoyaltyProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyProgramDefaultArgs<ExtArgs>>): Prisma__LoyaltyProgramClient<$Result.GetResult<Prisma.$LoyaltyProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyCard model
   */
  interface LoyaltyCardFieldRefs {
    readonly id: FieldRef<"LoyaltyCard", 'String'>
    readonly loyaltyProgramId: FieldRef<"LoyaltyCard", 'String'>
    readonly userId: FieldRef<"LoyaltyCard", 'String'>
    readonly points: FieldRef<"LoyaltyCard", 'Int'>
    readonly createdAt: FieldRef<"LoyaltyCard", 'DateTime'>
    readonly updatedAt: FieldRef<"LoyaltyCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyCard findUnique
   */
  export type LoyaltyCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyCard to fetch.
     */
    where: LoyaltyCardWhereUniqueInput
  }

  /**
   * LoyaltyCard findUniqueOrThrow
   */
  export type LoyaltyCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyCard to fetch.
     */
    where: LoyaltyCardWhereUniqueInput
  }

  /**
   * LoyaltyCard findFirst
   */
  export type LoyaltyCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyCard to fetch.
     */
    where?: LoyaltyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyCards to fetch.
     */
    orderBy?: LoyaltyCardOrderByWithRelationInput | LoyaltyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyCards.
     */
    cursor?: LoyaltyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyCards.
     */
    distinct?: LoyaltyCardScalarFieldEnum | LoyaltyCardScalarFieldEnum[]
  }

  /**
   * LoyaltyCard findFirstOrThrow
   */
  export type LoyaltyCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyCard to fetch.
     */
    where?: LoyaltyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyCards to fetch.
     */
    orderBy?: LoyaltyCardOrderByWithRelationInput | LoyaltyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyCards.
     */
    cursor?: LoyaltyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyCards.
     */
    distinct?: LoyaltyCardScalarFieldEnum | LoyaltyCardScalarFieldEnum[]
  }

  /**
   * LoyaltyCard findMany
   */
  export type LoyaltyCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyCards to fetch.
     */
    where?: LoyaltyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyCards to fetch.
     */
    orderBy?: LoyaltyCardOrderByWithRelationInput | LoyaltyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyCards.
     */
    cursor?: LoyaltyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyCards.
     */
    distinct?: LoyaltyCardScalarFieldEnum | LoyaltyCardScalarFieldEnum[]
  }

  /**
   * LoyaltyCard create
   */
  export type LoyaltyCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyCard.
     */
    data: XOR<LoyaltyCardCreateInput, LoyaltyCardUncheckedCreateInput>
  }

  /**
   * LoyaltyCard createMany
   */
  export type LoyaltyCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyCards.
     */
    data: LoyaltyCardCreateManyInput | LoyaltyCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyCard createManyAndReturn
   */
  export type LoyaltyCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyCards.
     */
    data: LoyaltyCardCreateManyInput | LoyaltyCardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyCard update
   */
  export type LoyaltyCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyCard.
     */
    data: XOR<LoyaltyCardUpdateInput, LoyaltyCardUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyCard to update.
     */
    where: LoyaltyCardWhereUniqueInput
  }

  /**
   * LoyaltyCard updateMany
   */
  export type LoyaltyCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyCards.
     */
    data: XOR<LoyaltyCardUpdateManyMutationInput, LoyaltyCardUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyCards to update
     */
    where?: LoyaltyCardWhereInput
    /**
     * Limit how many LoyaltyCards to update.
     */
    limit?: number
  }

  /**
   * LoyaltyCard updateManyAndReturn
   */
  export type LoyaltyCardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyCards.
     */
    data: XOR<LoyaltyCardUpdateManyMutationInput, LoyaltyCardUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyCards to update
     */
    where?: LoyaltyCardWhereInput
    /**
     * Limit how many LoyaltyCards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyCard upsert
   */
  export type LoyaltyCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyCard to update in case it exists.
     */
    where: LoyaltyCardWhereUniqueInput
    /**
     * In case the LoyaltyCard found by the `where` argument doesn't exist, create a new LoyaltyCard with this data.
     */
    create: XOR<LoyaltyCardCreateInput, LoyaltyCardUncheckedCreateInput>
    /**
     * In case the LoyaltyCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyCardUpdateInput, LoyaltyCardUncheckedUpdateInput>
  }

  /**
   * LoyaltyCard delete
   */
  export type LoyaltyCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyCard to delete.
     */
    where: LoyaltyCardWhereUniqueInput
  }

  /**
   * LoyaltyCard deleteMany
   */
  export type LoyaltyCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyCards to delete
     */
    where?: LoyaltyCardWhereInput
    /**
     * Limit how many LoyaltyCards to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyCard without action
   */
  export type LoyaltyCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyCard
     */
    select?: LoyaltyCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyCard
     */
    omit?: LoyaltyCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyCardInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    content: string | null
    type: $Enums.NotificationType | null
    read: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    content: string | null
    type: $Enums.NotificationType | null
    read: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    content: number
    type: number
    read: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    type?: true
    read?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    type?: true
    read?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    type?: true
    read?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    content: string
    type: $Enums.NotificationType
    read: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    type?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    type?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    type?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    type?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "content" | "type" | "read" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      content: string
      type: $Enums.NotificationType
      read: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model LoyaltyPlan
   */

  export type AggregateLoyaltyPlan = {
    _count: LoyaltyPlanCountAggregateOutputType | null
    _avg: LoyaltyPlanAvgAggregateOutputType | null
    _sum: LoyaltyPlanSumAggregateOutputType | null
    _min: LoyaltyPlanMinAggregateOutputType | null
    _max: LoyaltyPlanMaxAggregateOutputType | null
  }

  export type LoyaltyPlanAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type LoyaltyPlanSumAggregateOutputType = {
    price: Decimal | null
  }

  export type LoyaltyPlanMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    interval: $Enums.LoyaltyPlanInterval | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyPlanMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    interval: $Enums.LoyaltyPlanInterval | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyPlanCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    price: number
    interval: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoyaltyPlanAvgAggregateInputType = {
    price?: true
  }

  export type LoyaltyPlanSumAggregateInputType = {
    price?: true
  }

  export type LoyaltyPlanMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    interval?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyPlanMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    interval?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyPlanCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    price?: true
    interval?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoyaltyPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyPlan to aggregate.
     */
    where?: LoyaltyPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlans to fetch.
     */
    orderBy?: LoyaltyPlanOrderByWithRelationInput | LoyaltyPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyPlans
    **/
    _count?: true | LoyaltyPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyPlanMaxAggregateInputType
  }

  export type GetLoyaltyPlanAggregateType<T extends LoyaltyPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyPlan[P]>
      : GetScalarType<T[P], AggregateLoyaltyPlan[P]>
  }




  export type LoyaltyPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyPlanWhereInput
    orderBy?: LoyaltyPlanOrderByWithAggregationInput | LoyaltyPlanOrderByWithAggregationInput[]
    by: LoyaltyPlanScalarFieldEnum[] | LoyaltyPlanScalarFieldEnum
    having?: LoyaltyPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyPlanCountAggregateInputType | true
    _avg?: LoyaltyPlanAvgAggregateInputType
    _sum?: LoyaltyPlanSumAggregateInputType
    _min?: LoyaltyPlanMinAggregateInputType
    _max?: LoyaltyPlanMaxAggregateInputType
  }

  export type LoyaltyPlanGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    price: Decimal
    interval: $Enums.LoyaltyPlanInterval
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: LoyaltyPlanCountAggregateOutputType | null
    _avg: LoyaltyPlanAvgAggregateOutputType | null
    _sum: LoyaltyPlanSumAggregateOutputType | null
    _min: LoyaltyPlanMinAggregateOutputType | null
    _max: LoyaltyPlanMaxAggregateOutputType | null
  }

  type GetLoyaltyPlanGroupByPayload<T extends LoyaltyPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyPlanGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyPlanGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    interval?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | LoyaltyPlan$itemsArgs<ExtArgs>
    subscriptions?: boolean | LoyaltyPlan$subscriptionsArgs<ExtArgs>
    _count?: boolean | LoyaltyPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyPlan"]>

  export type LoyaltyPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    interval?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loyaltyPlan"]>

  export type LoyaltyPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    interval?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loyaltyPlan"]>

  export type LoyaltyPlanSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    interval?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoyaltyPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "price" | "interval" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["loyaltyPlan"]>
  export type LoyaltyPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | LoyaltyPlan$itemsArgs<ExtArgs>
    subscriptions?: boolean | LoyaltyPlan$subscriptionsArgs<ExtArgs>
    _count?: boolean | LoyaltyPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoyaltyPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LoyaltyPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LoyaltyPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyPlan"
    objects: {
      items: Prisma.$LoyaltyPlanItemPayload<ExtArgs>[]
      subscriptions: Prisma.$LoyaltySubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      price: Prisma.Decimal
      interval: $Enums.LoyaltyPlanInterval
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loyaltyPlan"]>
    composites: {}
  }

  type LoyaltyPlanGetPayload<S extends boolean | null | undefined | LoyaltyPlanDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyPlanPayload, S>

  type LoyaltyPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyPlanCountAggregateInputType | true
    }

  export interface LoyaltyPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyPlan'], meta: { name: 'LoyaltyPlan' } }
    /**
     * Find zero or one LoyaltyPlan that matches the filter.
     * @param {LoyaltyPlanFindUniqueArgs} args - Arguments to find a LoyaltyPlan
     * @example
     * // Get one LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyPlanFindUniqueArgs>(args: SelectSubset<T, LoyaltyPlanFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyPlanFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyPlan
     * @example
     * // Get one LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanFindFirstArgs} args - Arguments to find a LoyaltyPlan
     * @example
     * // Get one LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyPlanFindFirstArgs>(args?: SelectSubset<T, LoyaltyPlanFindFirstArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanFindFirstOrThrowArgs} args - Arguments to find a LoyaltyPlan
     * @example
     * // Get one LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyPlans
     * const loyaltyPlans = await prisma.loyaltyPlan.findMany()
     * 
     * // Get first 10 LoyaltyPlans
     * const loyaltyPlans = await prisma.loyaltyPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyPlanWithIdOnly = await prisma.loyaltyPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyPlanFindManyArgs>(args?: SelectSubset<T, LoyaltyPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyPlan.
     * @param {LoyaltyPlanCreateArgs} args - Arguments to create a LoyaltyPlan.
     * @example
     * // Create one LoyaltyPlan
     * const LoyaltyPlan = await prisma.loyaltyPlan.create({
     *   data: {
     *     // ... data to create a LoyaltyPlan
     *   }
     * })
     * 
     */
    create<T extends LoyaltyPlanCreateArgs>(args: SelectSubset<T, LoyaltyPlanCreateArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyPlans.
     * @param {LoyaltyPlanCreateManyArgs} args - Arguments to create many LoyaltyPlans.
     * @example
     * // Create many LoyaltyPlans
     * const loyaltyPlan = await prisma.loyaltyPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyPlanCreateManyArgs>(args?: SelectSubset<T, LoyaltyPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyPlans and returns the data saved in the database.
     * @param {LoyaltyPlanCreateManyAndReturnArgs} args - Arguments to create many LoyaltyPlans.
     * @example
     * // Create many LoyaltyPlans
     * const loyaltyPlan = await prisma.loyaltyPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyPlans and only return the `id`
     * const loyaltyPlanWithIdOnly = await prisma.loyaltyPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyPlan.
     * @param {LoyaltyPlanDeleteArgs} args - Arguments to delete one LoyaltyPlan.
     * @example
     * // Delete one LoyaltyPlan
     * const LoyaltyPlan = await prisma.loyaltyPlan.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyPlan
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyPlanDeleteArgs>(args: SelectSubset<T, LoyaltyPlanDeleteArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyPlan.
     * @param {LoyaltyPlanUpdateArgs} args - Arguments to update one LoyaltyPlan.
     * @example
     * // Update one LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyPlanUpdateArgs>(args: SelectSubset<T, LoyaltyPlanUpdateArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyPlans.
     * @param {LoyaltyPlanDeleteManyArgs} args - Arguments to filter LoyaltyPlans to delete.
     * @example
     * // Delete a few LoyaltyPlans
     * const { count } = await prisma.loyaltyPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyPlanDeleteManyArgs>(args?: SelectSubset<T, LoyaltyPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyPlans
     * const loyaltyPlan = await prisma.loyaltyPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyPlanUpdateManyArgs>(args: SelectSubset<T, LoyaltyPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPlans and returns the data updated in the database.
     * @param {LoyaltyPlanUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyPlans.
     * @example
     * // Update many LoyaltyPlans
     * const loyaltyPlan = await prisma.loyaltyPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyPlans and only return the `id`
     * const loyaltyPlanWithIdOnly = await prisma.loyaltyPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyPlan.
     * @param {LoyaltyPlanUpsertArgs} args - Arguments to update or create a LoyaltyPlan.
     * @example
     * // Update or create a LoyaltyPlan
     * const loyaltyPlan = await prisma.loyaltyPlan.upsert({
     *   create: {
     *     // ... data to create a LoyaltyPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyPlan we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyPlanUpsertArgs>(args: SelectSubset<T, LoyaltyPlanUpsertArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanCountArgs} args - Arguments to filter LoyaltyPlans to count.
     * @example
     * // Count the number of LoyaltyPlans
     * const count = await prisma.loyaltyPlan.count({
     *   where: {
     *     // ... the filter for the LoyaltyPlans we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyPlanCountArgs>(
      args?: Subset<T, LoyaltyPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyPlanAggregateArgs>(args: Subset<T, LoyaltyPlanAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyPlanAggregateType<T>>

    /**
     * Group by LoyaltyPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyPlanGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyPlan model
   */
  readonly fields: LoyaltyPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends LoyaltyPlan$itemsArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyPlan$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends LoyaltyPlan$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyPlan$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyPlan model
   */
  interface LoyaltyPlanFieldRefs {
    readonly id: FieldRef<"LoyaltyPlan", 'String'>
    readonly tenantId: FieldRef<"LoyaltyPlan", 'String'>
    readonly name: FieldRef<"LoyaltyPlan", 'String'>
    readonly description: FieldRef<"LoyaltyPlan", 'String'>
    readonly price: FieldRef<"LoyaltyPlan", 'Decimal'>
    readonly interval: FieldRef<"LoyaltyPlan", 'LoyaltyPlanInterval'>
    readonly active: FieldRef<"LoyaltyPlan", 'Boolean'>
    readonly createdAt: FieldRef<"LoyaltyPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"LoyaltyPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyPlan findUnique
   */
  export type LoyaltyPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlan to fetch.
     */
    where: LoyaltyPlanWhereUniqueInput
  }

  /**
   * LoyaltyPlan findUniqueOrThrow
   */
  export type LoyaltyPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlan to fetch.
     */
    where: LoyaltyPlanWhereUniqueInput
  }

  /**
   * LoyaltyPlan findFirst
   */
  export type LoyaltyPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlan to fetch.
     */
    where?: LoyaltyPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlans to fetch.
     */
    orderBy?: LoyaltyPlanOrderByWithRelationInput | LoyaltyPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPlans.
     */
    cursor?: LoyaltyPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlans.
     */
    distinct?: LoyaltyPlanScalarFieldEnum | LoyaltyPlanScalarFieldEnum[]
  }

  /**
   * LoyaltyPlan findFirstOrThrow
   */
  export type LoyaltyPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlan to fetch.
     */
    where?: LoyaltyPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlans to fetch.
     */
    orderBy?: LoyaltyPlanOrderByWithRelationInput | LoyaltyPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPlans.
     */
    cursor?: LoyaltyPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlans.
     */
    distinct?: LoyaltyPlanScalarFieldEnum | LoyaltyPlanScalarFieldEnum[]
  }

  /**
   * LoyaltyPlan findMany
   */
  export type LoyaltyPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlans to fetch.
     */
    where?: LoyaltyPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlans to fetch.
     */
    orderBy?: LoyaltyPlanOrderByWithRelationInput | LoyaltyPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyPlans.
     */
    cursor?: LoyaltyPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlans.
     */
    distinct?: LoyaltyPlanScalarFieldEnum | LoyaltyPlanScalarFieldEnum[]
  }

  /**
   * LoyaltyPlan create
   */
  export type LoyaltyPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyPlan.
     */
    data: XOR<LoyaltyPlanCreateInput, LoyaltyPlanUncheckedCreateInput>
  }

  /**
   * LoyaltyPlan createMany
   */
  export type LoyaltyPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyPlans.
     */
    data: LoyaltyPlanCreateManyInput | LoyaltyPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyPlan createManyAndReturn
   */
  export type LoyaltyPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyPlans.
     */
    data: LoyaltyPlanCreateManyInput | LoyaltyPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyPlan update
   */
  export type LoyaltyPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyPlan.
     */
    data: XOR<LoyaltyPlanUpdateInput, LoyaltyPlanUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyPlan to update.
     */
    where: LoyaltyPlanWhereUniqueInput
  }

  /**
   * LoyaltyPlan updateMany
   */
  export type LoyaltyPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyPlans.
     */
    data: XOR<LoyaltyPlanUpdateManyMutationInput, LoyaltyPlanUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPlans to update
     */
    where?: LoyaltyPlanWhereInput
    /**
     * Limit how many LoyaltyPlans to update.
     */
    limit?: number
  }

  /**
   * LoyaltyPlan updateManyAndReturn
   */
  export type LoyaltyPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyPlans.
     */
    data: XOR<LoyaltyPlanUpdateManyMutationInput, LoyaltyPlanUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPlans to update
     */
    where?: LoyaltyPlanWhereInput
    /**
     * Limit how many LoyaltyPlans to update.
     */
    limit?: number
  }

  /**
   * LoyaltyPlan upsert
   */
  export type LoyaltyPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyPlan to update in case it exists.
     */
    where: LoyaltyPlanWhereUniqueInput
    /**
     * In case the LoyaltyPlan found by the `where` argument doesn't exist, create a new LoyaltyPlan with this data.
     */
    create: XOR<LoyaltyPlanCreateInput, LoyaltyPlanUncheckedCreateInput>
    /**
     * In case the LoyaltyPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyPlanUpdateInput, LoyaltyPlanUncheckedUpdateInput>
  }

  /**
   * LoyaltyPlan delete
   */
  export type LoyaltyPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyPlan to delete.
     */
    where: LoyaltyPlanWhereUniqueInput
  }

  /**
   * LoyaltyPlan deleteMany
   */
  export type LoyaltyPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyPlans to delete
     */
    where?: LoyaltyPlanWhereInput
    /**
     * Limit how many LoyaltyPlans to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyPlan.items
   */
  export type LoyaltyPlan$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    where?: LoyaltyPlanItemWhereInput
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    cursor?: LoyaltyPlanItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltyPlanItemScalarFieldEnum | LoyaltyPlanItemScalarFieldEnum[]
  }

  /**
   * LoyaltyPlan.subscriptions
   */
  export type LoyaltyPlan$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    where?: LoyaltySubscriptionWhereInput
    orderBy?: LoyaltySubscriptionOrderByWithRelationInput | LoyaltySubscriptionOrderByWithRelationInput[]
    cursor?: LoyaltySubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltySubscriptionScalarFieldEnum | LoyaltySubscriptionScalarFieldEnum[]
  }

  /**
   * LoyaltyPlan without action
   */
  export type LoyaltyPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlan
     */
    select?: LoyaltyPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlan
     */
    omit?: LoyaltyPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanInclude<ExtArgs> | null
  }


  /**
   * Model LoyaltyPlanItem
   */

  export type AggregateLoyaltyPlanItem = {
    _count: LoyaltyPlanItemCountAggregateOutputType | null
    _avg: LoyaltyPlanItemAvgAggregateOutputType | null
    _sum: LoyaltyPlanItemSumAggregateOutputType | null
    _min: LoyaltyPlanItemMinAggregateOutputType | null
    _max: LoyaltyPlanItemMaxAggregateOutputType | null
  }

  export type LoyaltyPlanItemAvgAggregateOutputType = {
    quantity: number | null
    allowedDays: number | null
  }

  export type LoyaltyPlanItemSumAggregateOutputType = {
    quantity: number | null
    allowedDays: number[]
  }

  export type LoyaltyPlanItemMinAggregateOutputType = {
    id: string | null
    planId: string | null
    serviceId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyPlanItemMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    serviceId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltyPlanItemCountAggregateOutputType = {
    id: number
    planId: number
    serviceId: number
    quantity: number
    allowedDays: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoyaltyPlanItemAvgAggregateInputType = {
    quantity?: true
    allowedDays?: true
  }

  export type LoyaltyPlanItemSumAggregateInputType = {
    quantity?: true
    allowedDays?: true
  }

  export type LoyaltyPlanItemMinAggregateInputType = {
    id?: true
    planId?: true
    serviceId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyPlanItemMaxAggregateInputType = {
    id?: true
    planId?: true
    serviceId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltyPlanItemCountAggregateInputType = {
    id?: true
    planId?: true
    serviceId?: true
    quantity?: true
    allowedDays?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoyaltyPlanItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyPlanItem to aggregate.
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlanItems to fetch.
     */
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyPlanItems
    **/
    _count?: true | LoyaltyPlanItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoyaltyPlanItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoyaltyPlanItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyPlanItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyPlanItemMaxAggregateInputType
  }

  export type GetLoyaltyPlanItemAggregateType<T extends LoyaltyPlanItemAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyPlanItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyPlanItem[P]>
      : GetScalarType<T[P], AggregateLoyaltyPlanItem[P]>
  }




  export type LoyaltyPlanItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyPlanItemWhereInput
    orderBy?: LoyaltyPlanItemOrderByWithAggregationInput | LoyaltyPlanItemOrderByWithAggregationInput[]
    by: LoyaltyPlanItemScalarFieldEnum[] | LoyaltyPlanItemScalarFieldEnum
    having?: LoyaltyPlanItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyPlanItemCountAggregateInputType | true
    _avg?: LoyaltyPlanItemAvgAggregateInputType
    _sum?: LoyaltyPlanItemSumAggregateInputType
    _min?: LoyaltyPlanItemMinAggregateInputType
    _max?: LoyaltyPlanItemMaxAggregateInputType
  }

  export type LoyaltyPlanItemGroupByOutputType = {
    id: string
    planId: string
    serviceId: string
    quantity: number
    allowedDays: number[]
    createdAt: Date
    updatedAt: Date
    _count: LoyaltyPlanItemCountAggregateOutputType | null
    _avg: LoyaltyPlanItemAvgAggregateOutputType | null
    _sum: LoyaltyPlanItemSumAggregateOutputType | null
    _min: LoyaltyPlanItemMinAggregateOutputType | null
    _max: LoyaltyPlanItemMaxAggregateOutputType | null
  }

  type GetLoyaltyPlanItemGroupByPayload<T extends LoyaltyPlanItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyPlanItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyPlanItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyPlanItemGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyPlanItemGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyPlanItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    serviceId?: boolean
    quantity?: boolean
    allowedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyPlanItem"]>

  export type LoyaltyPlanItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    serviceId?: boolean
    quantity?: boolean
    allowedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyPlanItem"]>

  export type LoyaltyPlanItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    serviceId?: boolean
    quantity?: boolean
    allowedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyPlanItem"]>

  export type LoyaltyPlanItemSelectScalar = {
    id?: boolean
    planId?: boolean
    serviceId?: boolean
    quantity?: boolean
    allowedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoyaltyPlanItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "serviceId" | "quantity" | "allowedDays" | "createdAt" | "updatedAt", ExtArgs["result"]["loyaltyPlanItem"]>
  export type LoyaltyPlanItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type LoyaltyPlanItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type LoyaltyPlanItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $LoyaltyPlanItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyPlanItem"
    objects: {
      plan: Prisma.$LoyaltyPlanPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      serviceId: string
      quantity: number
      allowedDays: number[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loyaltyPlanItem"]>
    composites: {}
  }

  type LoyaltyPlanItemGetPayload<S extends boolean | null | undefined | LoyaltyPlanItemDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyPlanItemPayload, S>

  type LoyaltyPlanItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyPlanItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyPlanItemCountAggregateInputType | true
    }

  export interface LoyaltyPlanItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyPlanItem'], meta: { name: 'LoyaltyPlanItem' } }
    /**
     * Find zero or one LoyaltyPlanItem that matches the filter.
     * @param {LoyaltyPlanItemFindUniqueArgs} args - Arguments to find a LoyaltyPlanItem
     * @example
     * // Get one LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyPlanItemFindUniqueArgs>(args: SelectSubset<T, LoyaltyPlanItemFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyPlanItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyPlanItemFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyPlanItem
     * @example
     * // Get one LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyPlanItemFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyPlanItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyPlanItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemFindFirstArgs} args - Arguments to find a LoyaltyPlanItem
     * @example
     * // Get one LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyPlanItemFindFirstArgs>(args?: SelectSubset<T, LoyaltyPlanItemFindFirstArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyPlanItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemFindFirstOrThrowArgs} args - Arguments to find a LoyaltyPlanItem
     * @example
     * // Get one LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyPlanItemFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyPlanItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyPlanItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyPlanItems
     * const loyaltyPlanItems = await prisma.loyaltyPlanItem.findMany()
     * 
     * // Get first 10 LoyaltyPlanItems
     * const loyaltyPlanItems = await prisma.loyaltyPlanItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyPlanItemWithIdOnly = await prisma.loyaltyPlanItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyPlanItemFindManyArgs>(args?: SelectSubset<T, LoyaltyPlanItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyPlanItem.
     * @param {LoyaltyPlanItemCreateArgs} args - Arguments to create a LoyaltyPlanItem.
     * @example
     * // Create one LoyaltyPlanItem
     * const LoyaltyPlanItem = await prisma.loyaltyPlanItem.create({
     *   data: {
     *     // ... data to create a LoyaltyPlanItem
     *   }
     * })
     * 
     */
    create<T extends LoyaltyPlanItemCreateArgs>(args: SelectSubset<T, LoyaltyPlanItemCreateArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyPlanItems.
     * @param {LoyaltyPlanItemCreateManyArgs} args - Arguments to create many LoyaltyPlanItems.
     * @example
     * // Create many LoyaltyPlanItems
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyPlanItemCreateManyArgs>(args?: SelectSubset<T, LoyaltyPlanItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyPlanItems and returns the data saved in the database.
     * @param {LoyaltyPlanItemCreateManyAndReturnArgs} args - Arguments to create many LoyaltyPlanItems.
     * @example
     * // Create many LoyaltyPlanItems
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyPlanItems and only return the `id`
     * const loyaltyPlanItemWithIdOnly = await prisma.loyaltyPlanItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyPlanItemCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyPlanItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyPlanItem.
     * @param {LoyaltyPlanItemDeleteArgs} args - Arguments to delete one LoyaltyPlanItem.
     * @example
     * // Delete one LoyaltyPlanItem
     * const LoyaltyPlanItem = await prisma.loyaltyPlanItem.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyPlanItem
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyPlanItemDeleteArgs>(args: SelectSubset<T, LoyaltyPlanItemDeleteArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyPlanItem.
     * @param {LoyaltyPlanItemUpdateArgs} args - Arguments to update one LoyaltyPlanItem.
     * @example
     * // Update one LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyPlanItemUpdateArgs>(args: SelectSubset<T, LoyaltyPlanItemUpdateArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyPlanItems.
     * @param {LoyaltyPlanItemDeleteManyArgs} args - Arguments to filter LoyaltyPlanItems to delete.
     * @example
     * // Delete a few LoyaltyPlanItems
     * const { count } = await prisma.loyaltyPlanItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyPlanItemDeleteManyArgs>(args?: SelectSubset<T, LoyaltyPlanItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyPlanItems
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyPlanItemUpdateManyArgs>(args: SelectSubset<T, LoyaltyPlanItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyPlanItems and returns the data updated in the database.
     * @param {LoyaltyPlanItemUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyPlanItems.
     * @example
     * // Update many LoyaltyPlanItems
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyPlanItems and only return the `id`
     * const loyaltyPlanItemWithIdOnly = await prisma.loyaltyPlanItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyPlanItemUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyPlanItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyPlanItem.
     * @param {LoyaltyPlanItemUpsertArgs} args - Arguments to update or create a LoyaltyPlanItem.
     * @example
     * // Update or create a LoyaltyPlanItem
     * const loyaltyPlanItem = await prisma.loyaltyPlanItem.upsert({
     *   create: {
     *     // ... data to create a LoyaltyPlanItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyPlanItem we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyPlanItemUpsertArgs>(args: SelectSubset<T, LoyaltyPlanItemUpsertArgs<ExtArgs>>): Prisma__LoyaltyPlanItemClient<$Result.GetResult<Prisma.$LoyaltyPlanItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemCountArgs} args - Arguments to filter LoyaltyPlanItems to count.
     * @example
     * // Count the number of LoyaltyPlanItems
     * const count = await prisma.loyaltyPlanItem.count({
     *   where: {
     *     // ... the filter for the LoyaltyPlanItems we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyPlanItemCountArgs>(
      args?: Subset<T, LoyaltyPlanItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyPlanItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyPlanItemAggregateArgs>(args: Subset<T, LoyaltyPlanItemAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyPlanItemAggregateType<T>>

    /**
     * Group by LoyaltyPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyPlanItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyPlanItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyPlanItemGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyPlanItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyPlanItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyPlanItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyPlanItem model
   */
  readonly fields: LoyaltyPlanItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyPlanItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyPlanItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends LoyaltyPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyPlanDefaultArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyPlanItem model
   */
  interface LoyaltyPlanItemFieldRefs {
    readonly id: FieldRef<"LoyaltyPlanItem", 'String'>
    readonly planId: FieldRef<"LoyaltyPlanItem", 'String'>
    readonly serviceId: FieldRef<"LoyaltyPlanItem", 'String'>
    readonly quantity: FieldRef<"LoyaltyPlanItem", 'Int'>
    readonly allowedDays: FieldRef<"LoyaltyPlanItem", 'Int[]'>
    readonly createdAt: FieldRef<"LoyaltyPlanItem", 'DateTime'>
    readonly updatedAt: FieldRef<"LoyaltyPlanItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyPlanItem findUnique
   */
  export type LoyaltyPlanItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlanItem to fetch.
     */
    where: LoyaltyPlanItemWhereUniqueInput
  }

  /**
   * LoyaltyPlanItem findUniqueOrThrow
   */
  export type LoyaltyPlanItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlanItem to fetch.
     */
    where: LoyaltyPlanItemWhereUniqueInput
  }

  /**
   * LoyaltyPlanItem findFirst
   */
  export type LoyaltyPlanItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlanItem to fetch.
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlanItems to fetch.
     */
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPlanItems.
     */
    cursor?: LoyaltyPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlanItems.
     */
    distinct?: LoyaltyPlanItemScalarFieldEnum | LoyaltyPlanItemScalarFieldEnum[]
  }

  /**
   * LoyaltyPlanItem findFirstOrThrow
   */
  export type LoyaltyPlanItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlanItem to fetch.
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlanItems to fetch.
     */
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyPlanItems.
     */
    cursor?: LoyaltyPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlanItems.
     */
    distinct?: LoyaltyPlanItemScalarFieldEnum | LoyaltyPlanItemScalarFieldEnum[]
  }

  /**
   * LoyaltyPlanItem findMany
   */
  export type LoyaltyPlanItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyPlanItems to fetch.
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyPlanItems to fetch.
     */
    orderBy?: LoyaltyPlanItemOrderByWithRelationInput | LoyaltyPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyPlanItems.
     */
    cursor?: LoyaltyPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyPlanItems.
     */
    distinct?: LoyaltyPlanItemScalarFieldEnum | LoyaltyPlanItemScalarFieldEnum[]
  }

  /**
   * LoyaltyPlanItem create
   */
  export type LoyaltyPlanItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyPlanItem.
     */
    data: XOR<LoyaltyPlanItemCreateInput, LoyaltyPlanItemUncheckedCreateInput>
  }

  /**
   * LoyaltyPlanItem createMany
   */
  export type LoyaltyPlanItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyPlanItems.
     */
    data: LoyaltyPlanItemCreateManyInput | LoyaltyPlanItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyPlanItem createManyAndReturn
   */
  export type LoyaltyPlanItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyPlanItems.
     */
    data: LoyaltyPlanItemCreateManyInput | LoyaltyPlanItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyPlanItem update
   */
  export type LoyaltyPlanItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyPlanItem.
     */
    data: XOR<LoyaltyPlanItemUpdateInput, LoyaltyPlanItemUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyPlanItem to update.
     */
    where: LoyaltyPlanItemWhereUniqueInput
  }

  /**
   * LoyaltyPlanItem updateMany
   */
  export type LoyaltyPlanItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyPlanItems.
     */
    data: XOR<LoyaltyPlanItemUpdateManyMutationInput, LoyaltyPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPlanItems to update
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * Limit how many LoyaltyPlanItems to update.
     */
    limit?: number
  }

  /**
   * LoyaltyPlanItem updateManyAndReturn
   */
  export type LoyaltyPlanItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyPlanItems.
     */
    data: XOR<LoyaltyPlanItemUpdateManyMutationInput, LoyaltyPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyPlanItems to update
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * Limit how many LoyaltyPlanItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyPlanItem upsert
   */
  export type LoyaltyPlanItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyPlanItem to update in case it exists.
     */
    where: LoyaltyPlanItemWhereUniqueInput
    /**
     * In case the LoyaltyPlanItem found by the `where` argument doesn't exist, create a new LoyaltyPlanItem with this data.
     */
    create: XOR<LoyaltyPlanItemCreateInput, LoyaltyPlanItemUncheckedCreateInput>
    /**
     * In case the LoyaltyPlanItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyPlanItemUpdateInput, LoyaltyPlanItemUncheckedUpdateInput>
  }

  /**
   * LoyaltyPlanItem delete
   */
  export type LoyaltyPlanItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyPlanItem to delete.
     */
    where: LoyaltyPlanItemWhereUniqueInput
  }

  /**
   * LoyaltyPlanItem deleteMany
   */
  export type LoyaltyPlanItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyPlanItems to delete
     */
    where?: LoyaltyPlanItemWhereInput
    /**
     * Limit how many LoyaltyPlanItems to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyPlanItem without action
   */
  export type LoyaltyPlanItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyPlanItem
     */
    select?: LoyaltyPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyPlanItem
     */
    omit?: LoyaltyPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyPlanItemInclude<ExtArgs> | null
  }


  /**
   * Model LoyaltySubscription
   */

  export type AggregateLoyaltySubscription = {
    _count: LoyaltySubscriptionCountAggregateOutputType | null
    _min: LoyaltySubscriptionMinAggregateOutputType | null
    _max: LoyaltySubscriptionMaxAggregateOutputType | null
  }

  export type LoyaltySubscriptionMinAggregateOutputType = {
    id: string | null
    planId: string | null
    userId: string | null
    barberId: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltySubscriptionMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    userId: string | null
    barberId: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoyaltySubscriptionCountAggregateOutputType = {
    id: number
    planId: number
    userId: number
    barberId: number
    status: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoyaltySubscriptionMinAggregateInputType = {
    id?: true
    planId?: true
    userId?: true
    barberId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltySubscriptionMaxAggregateInputType = {
    id?: true
    planId?: true
    userId?: true
    barberId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoyaltySubscriptionCountAggregateInputType = {
    id?: true
    planId?: true
    userId?: true
    barberId?: true
    status?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoyaltySubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltySubscription to aggregate.
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltySubscriptions to fetch.
     */
    orderBy?: LoyaltySubscriptionOrderByWithRelationInput | LoyaltySubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltySubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltySubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltySubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltySubscriptions
    **/
    _count?: true | LoyaltySubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltySubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltySubscriptionMaxAggregateInputType
  }

  export type GetLoyaltySubscriptionAggregateType<T extends LoyaltySubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltySubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltySubscription[P]>
      : GetScalarType<T[P], AggregateLoyaltySubscription[P]>
  }




  export type LoyaltySubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltySubscriptionWhereInput
    orderBy?: LoyaltySubscriptionOrderByWithAggregationInput | LoyaltySubscriptionOrderByWithAggregationInput[]
    by: LoyaltySubscriptionScalarFieldEnum[] | LoyaltySubscriptionScalarFieldEnum
    having?: LoyaltySubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltySubscriptionCountAggregateInputType | true
    _min?: LoyaltySubscriptionMinAggregateInputType
    _max?: LoyaltySubscriptionMaxAggregateInputType
  }

  export type LoyaltySubscriptionGroupByOutputType = {
    id: string
    planId: string
    userId: string
    barberId: string | null
    status: string
    startDate: Date
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LoyaltySubscriptionCountAggregateOutputType | null
    _min: LoyaltySubscriptionMinAggregateOutputType | null
    _max: LoyaltySubscriptionMaxAggregateOutputType | null
  }

  type GetLoyaltySubscriptionGroupByPayload<T extends LoyaltySubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltySubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltySubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltySubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltySubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltySubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    userId?: boolean
    barberId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    usages?: boolean | LoyaltySubscription$usagesArgs<ExtArgs>
    _count?: boolean | LoyaltySubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltySubscription"]>

  export type LoyaltySubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    userId?: boolean
    barberId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltySubscription"]>

  export type LoyaltySubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    userId?: boolean
    barberId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltySubscription"]>

  export type LoyaltySubscriptionSelectScalar = {
    id?: boolean
    planId?: boolean
    userId?: boolean
    barberId?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoyaltySubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "userId" | "barberId" | "status" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["loyaltySubscription"]>
  export type LoyaltySubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
    usages?: boolean | LoyaltySubscription$usagesArgs<ExtArgs>
    _count?: boolean | LoyaltySubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoyaltySubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
  }
  export type LoyaltySubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | LoyaltyPlanDefaultArgs<ExtArgs>
  }

  export type $LoyaltySubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltySubscription"
    objects: {
      plan: Prisma.$LoyaltyPlanPayload<ExtArgs>
      usages: Prisma.$LoyaltyUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      userId: string
      /**
       * * Quando a barbearia usa caixa separado: assinatura “pertence” ao barbeiro (balcão / carteira).
       */
      barberId: string | null
      status: string
      startDate: Date
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loyaltySubscription"]>
    composites: {}
  }

  type LoyaltySubscriptionGetPayload<S extends boolean | null | undefined | LoyaltySubscriptionDefaultArgs> = $Result.GetResult<Prisma.$LoyaltySubscriptionPayload, S>

  type LoyaltySubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltySubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltySubscriptionCountAggregateInputType | true
    }

  export interface LoyaltySubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltySubscription'], meta: { name: 'LoyaltySubscription' } }
    /**
     * Find zero or one LoyaltySubscription that matches the filter.
     * @param {LoyaltySubscriptionFindUniqueArgs} args - Arguments to find a LoyaltySubscription
     * @example
     * // Get one LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltySubscriptionFindUniqueArgs>(args: SelectSubset<T, LoyaltySubscriptionFindUniqueArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltySubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltySubscriptionFindUniqueOrThrowArgs} args - Arguments to find a LoyaltySubscription
     * @example
     * // Get one LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltySubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltySubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltySubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionFindFirstArgs} args - Arguments to find a LoyaltySubscription
     * @example
     * // Get one LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltySubscriptionFindFirstArgs>(args?: SelectSubset<T, LoyaltySubscriptionFindFirstArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltySubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionFindFirstOrThrowArgs} args - Arguments to find a LoyaltySubscription
     * @example
     * // Get one LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltySubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltySubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltySubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltySubscriptions
     * const loyaltySubscriptions = await prisma.loyaltySubscription.findMany()
     * 
     * // Get first 10 LoyaltySubscriptions
     * const loyaltySubscriptions = await prisma.loyaltySubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltySubscriptionWithIdOnly = await prisma.loyaltySubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltySubscriptionFindManyArgs>(args?: SelectSubset<T, LoyaltySubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltySubscription.
     * @param {LoyaltySubscriptionCreateArgs} args - Arguments to create a LoyaltySubscription.
     * @example
     * // Create one LoyaltySubscription
     * const LoyaltySubscription = await prisma.loyaltySubscription.create({
     *   data: {
     *     // ... data to create a LoyaltySubscription
     *   }
     * })
     * 
     */
    create<T extends LoyaltySubscriptionCreateArgs>(args: SelectSubset<T, LoyaltySubscriptionCreateArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltySubscriptions.
     * @param {LoyaltySubscriptionCreateManyArgs} args - Arguments to create many LoyaltySubscriptions.
     * @example
     * // Create many LoyaltySubscriptions
     * const loyaltySubscription = await prisma.loyaltySubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltySubscriptionCreateManyArgs>(args?: SelectSubset<T, LoyaltySubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltySubscriptions and returns the data saved in the database.
     * @param {LoyaltySubscriptionCreateManyAndReturnArgs} args - Arguments to create many LoyaltySubscriptions.
     * @example
     * // Create many LoyaltySubscriptions
     * const loyaltySubscription = await prisma.loyaltySubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltySubscriptions and only return the `id`
     * const loyaltySubscriptionWithIdOnly = await prisma.loyaltySubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltySubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltySubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltySubscription.
     * @param {LoyaltySubscriptionDeleteArgs} args - Arguments to delete one LoyaltySubscription.
     * @example
     * // Delete one LoyaltySubscription
     * const LoyaltySubscription = await prisma.loyaltySubscription.delete({
     *   where: {
     *     // ... filter to delete one LoyaltySubscription
     *   }
     * })
     * 
     */
    delete<T extends LoyaltySubscriptionDeleteArgs>(args: SelectSubset<T, LoyaltySubscriptionDeleteArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltySubscription.
     * @param {LoyaltySubscriptionUpdateArgs} args - Arguments to update one LoyaltySubscription.
     * @example
     * // Update one LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltySubscriptionUpdateArgs>(args: SelectSubset<T, LoyaltySubscriptionUpdateArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltySubscriptions.
     * @param {LoyaltySubscriptionDeleteManyArgs} args - Arguments to filter LoyaltySubscriptions to delete.
     * @example
     * // Delete a few LoyaltySubscriptions
     * const { count } = await prisma.loyaltySubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltySubscriptionDeleteManyArgs>(args?: SelectSubset<T, LoyaltySubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltySubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltySubscriptions
     * const loyaltySubscription = await prisma.loyaltySubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltySubscriptionUpdateManyArgs>(args: SelectSubset<T, LoyaltySubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltySubscriptions and returns the data updated in the database.
     * @param {LoyaltySubscriptionUpdateManyAndReturnArgs} args - Arguments to update many LoyaltySubscriptions.
     * @example
     * // Update many LoyaltySubscriptions
     * const loyaltySubscription = await prisma.loyaltySubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltySubscriptions and only return the `id`
     * const loyaltySubscriptionWithIdOnly = await prisma.loyaltySubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltySubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltySubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltySubscription.
     * @param {LoyaltySubscriptionUpsertArgs} args - Arguments to update or create a LoyaltySubscription.
     * @example
     * // Update or create a LoyaltySubscription
     * const loyaltySubscription = await prisma.loyaltySubscription.upsert({
     *   create: {
     *     // ... data to create a LoyaltySubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltySubscription we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltySubscriptionUpsertArgs>(args: SelectSubset<T, LoyaltySubscriptionUpsertArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltySubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionCountArgs} args - Arguments to filter LoyaltySubscriptions to count.
     * @example
     * // Count the number of LoyaltySubscriptions
     * const count = await prisma.loyaltySubscription.count({
     *   where: {
     *     // ... the filter for the LoyaltySubscriptions we want to count
     *   }
     * })
    **/
    count<T extends LoyaltySubscriptionCountArgs>(
      args?: Subset<T, LoyaltySubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltySubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltySubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltySubscriptionAggregateArgs>(args: Subset<T, LoyaltySubscriptionAggregateArgs>): Prisma.PrismaPromise<GetLoyaltySubscriptionAggregateType<T>>

    /**
     * Group by LoyaltySubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltySubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltySubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltySubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltySubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltySubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltySubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltySubscription model
   */
  readonly fields: LoyaltySubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltySubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltySubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends LoyaltyPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltyPlanDefaultArgs<ExtArgs>>): Prisma__LoyaltyPlanClient<$Result.GetResult<Prisma.$LoyaltyPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usages<T extends LoyaltySubscription$usagesArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltySubscription$usagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltySubscription model
   */
  interface LoyaltySubscriptionFieldRefs {
    readonly id: FieldRef<"LoyaltySubscription", 'String'>
    readonly planId: FieldRef<"LoyaltySubscription", 'String'>
    readonly userId: FieldRef<"LoyaltySubscription", 'String'>
    readonly barberId: FieldRef<"LoyaltySubscription", 'String'>
    readonly status: FieldRef<"LoyaltySubscription", 'String'>
    readonly startDate: FieldRef<"LoyaltySubscription", 'DateTime'>
    readonly endDate: FieldRef<"LoyaltySubscription", 'DateTime'>
    readonly createdAt: FieldRef<"LoyaltySubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"LoyaltySubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltySubscription findUnique
   */
  export type LoyaltySubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltySubscription to fetch.
     */
    where: LoyaltySubscriptionWhereUniqueInput
  }

  /**
   * LoyaltySubscription findUniqueOrThrow
   */
  export type LoyaltySubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltySubscription to fetch.
     */
    where: LoyaltySubscriptionWhereUniqueInput
  }

  /**
   * LoyaltySubscription findFirst
   */
  export type LoyaltySubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltySubscription to fetch.
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltySubscriptions to fetch.
     */
    orderBy?: LoyaltySubscriptionOrderByWithRelationInput | LoyaltySubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltySubscriptions.
     */
    cursor?: LoyaltySubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltySubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltySubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltySubscriptions.
     */
    distinct?: LoyaltySubscriptionScalarFieldEnum | LoyaltySubscriptionScalarFieldEnum[]
  }

  /**
   * LoyaltySubscription findFirstOrThrow
   */
  export type LoyaltySubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltySubscription to fetch.
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltySubscriptions to fetch.
     */
    orderBy?: LoyaltySubscriptionOrderByWithRelationInput | LoyaltySubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltySubscriptions.
     */
    cursor?: LoyaltySubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltySubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltySubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltySubscriptions.
     */
    distinct?: LoyaltySubscriptionScalarFieldEnum | LoyaltySubscriptionScalarFieldEnum[]
  }

  /**
   * LoyaltySubscription findMany
   */
  export type LoyaltySubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltySubscriptions to fetch.
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltySubscriptions to fetch.
     */
    orderBy?: LoyaltySubscriptionOrderByWithRelationInput | LoyaltySubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltySubscriptions.
     */
    cursor?: LoyaltySubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltySubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltySubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltySubscriptions.
     */
    distinct?: LoyaltySubscriptionScalarFieldEnum | LoyaltySubscriptionScalarFieldEnum[]
  }

  /**
   * LoyaltySubscription create
   */
  export type LoyaltySubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltySubscription.
     */
    data: XOR<LoyaltySubscriptionCreateInput, LoyaltySubscriptionUncheckedCreateInput>
  }

  /**
   * LoyaltySubscription createMany
   */
  export type LoyaltySubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltySubscriptions.
     */
    data: LoyaltySubscriptionCreateManyInput | LoyaltySubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltySubscription createManyAndReturn
   */
  export type LoyaltySubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltySubscriptions.
     */
    data: LoyaltySubscriptionCreateManyInput | LoyaltySubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltySubscription update
   */
  export type LoyaltySubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltySubscription.
     */
    data: XOR<LoyaltySubscriptionUpdateInput, LoyaltySubscriptionUncheckedUpdateInput>
    /**
     * Choose, which LoyaltySubscription to update.
     */
    where: LoyaltySubscriptionWhereUniqueInput
  }

  /**
   * LoyaltySubscription updateMany
   */
  export type LoyaltySubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltySubscriptions.
     */
    data: XOR<LoyaltySubscriptionUpdateManyMutationInput, LoyaltySubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltySubscriptions to update
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * Limit how many LoyaltySubscriptions to update.
     */
    limit?: number
  }

  /**
   * LoyaltySubscription updateManyAndReturn
   */
  export type LoyaltySubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltySubscriptions.
     */
    data: XOR<LoyaltySubscriptionUpdateManyMutationInput, LoyaltySubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltySubscriptions to update
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * Limit how many LoyaltySubscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltySubscription upsert
   */
  export type LoyaltySubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltySubscription to update in case it exists.
     */
    where: LoyaltySubscriptionWhereUniqueInput
    /**
     * In case the LoyaltySubscription found by the `where` argument doesn't exist, create a new LoyaltySubscription with this data.
     */
    create: XOR<LoyaltySubscriptionCreateInput, LoyaltySubscriptionUncheckedCreateInput>
    /**
     * In case the LoyaltySubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltySubscriptionUpdateInput, LoyaltySubscriptionUncheckedUpdateInput>
  }

  /**
   * LoyaltySubscription delete
   */
  export type LoyaltySubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
    /**
     * Filter which LoyaltySubscription to delete.
     */
    where: LoyaltySubscriptionWhereUniqueInput
  }

  /**
   * LoyaltySubscription deleteMany
   */
  export type LoyaltySubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltySubscriptions to delete
     */
    where?: LoyaltySubscriptionWhereInput
    /**
     * Limit how many LoyaltySubscriptions to delete.
     */
    limit?: number
  }

  /**
   * LoyaltySubscription.usages
   */
  export type LoyaltySubscription$usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    where?: LoyaltyUsageWhereInput
    orderBy?: LoyaltyUsageOrderByWithRelationInput | LoyaltyUsageOrderByWithRelationInput[]
    cursor?: LoyaltyUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoyaltyUsageScalarFieldEnum | LoyaltyUsageScalarFieldEnum[]
  }

  /**
   * LoyaltySubscription without action
   */
  export type LoyaltySubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltySubscription
     */
    select?: LoyaltySubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltySubscription
     */
    omit?: LoyaltySubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltySubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model LoyaltyUsage
   */

  export type AggregateLoyaltyUsage = {
    _count: LoyaltyUsageCountAggregateOutputType | null
    _min: LoyaltyUsageMinAggregateOutputType | null
    _max: LoyaltyUsageMaxAggregateOutputType | null
  }

  export type LoyaltyUsageMinAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    appointmentId: string | null
    usedAt: Date | null
  }

  export type LoyaltyUsageMaxAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    appointmentId: string | null
    usedAt: Date | null
  }

  export type LoyaltyUsageCountAggregateOutputType = {
    id: number
    subscriptionId: number
    appointmentId: number
    usedAt: number
    _all: number
  }


  export type LoyaltyUsageMinAggregateInputType = {
    id?: true
    subscriptionId?: true
    appointmentId?: true
    usedAt?: true
  }

  export type LoyaltyUsageMaxAggregateInputType = {
    id?: true
    subscriptionId?: true
    appointmentId?: true
    usedAt?: true
  }

  export type LoyaltyUsageCountAggregateInputType = {
    id?: true
    subscriptionId?: true
    appointmentId?: true
    usedAt?: true
    _all?: true
  }

  export type LoyaltyUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyUsage to aggregate.
     */
    where?: LoyaltyUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyUsages to fetch.
     */
    orderBy?: LoyaltyUsageOrderByWithRelationInput | LoyaltyUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoyaltyUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoyaltyUsages
    **/
    _count?: true | LoyaltyUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoyaltyUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoyaltyUsageMaxAggregateInputType
  }

  export type GetLoyaltyUsageAggregateType<T extends LoyaltyUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateLoyaltyUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoyaltyUsage[P]>
      : GetScalarType<T[P], AggregateLoyaltyUsage[P]>
  }




  export type LoyaltyUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoyaltyUsageWhereInput
    orderBy?: LoyaltyUsageOrderByWithAggregationInput | LoyaltyUsageOrderByWithAggregationInput[]
    by: LoyaltyUsageScalarFieldEnum[] | LoyaltyUsageScalarFieldEnum
    having?: LoyaltyUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoyaltyUsageCountAggregateInputType | true
    _min?: LoyaltyUsageMinAggregateInputType
    _max?: LoyaltyUsageMaxAggregateInputType
  }

  export type LoyaltyUsageGroupByOutputType = {
    id: string
    subscriptionId: string
    appointmentId: string
    usedAt: Date
    _count: LoyaltyUsageCountAggregateOutputType | null
    _min: LoyaltyUsageMinAggregateOutputType | null
    _max: LoyaltyUsageMaxAggregateOutputType | null
  }

  type GetLoyaltyUsageGroupByPayload<T extends LoyaltyUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoyaltyUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoyaltyUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoyaltyUsageGroupByOutputType[P]>
            : GetScalarType<T[P], LoyaltyUsageGroupByOutputType[P]>
        }
      >
    >


  export type LoyaltyUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    appointmentId?: boolean
    usedAt?: boolean
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyUsage"]>

  export type LoyaltyUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    appointmentId?: boolean
    usedAt?: boolean
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyUsage"]>

  export type LoyaltyUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    appointmentId?: boolean
    usedAt?: boolean
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loyaltyUsage"]>

  export type LoyaltyUsageSelectScalar = {
    id?: boolean
    subscriptionId?: boolean
    appointmentId?: boolean
    usedAt?: boolean
  }

  export type LoyaltyUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subscriptionId" | "appointmentId" | "usedAt", ExtArgs["result"]["loyaltyUsage"]>
  export type LoyaltyUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }
  export type LoyaltyUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }
  export type LoyaltyUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | LoyaltySubscriptionDefaultArgs<ExtArgs>
    appointment?: boolean | AppointmentDefaultArgs<ExtArgs>
  }

  export type $LoyaltyUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoyaltyUsage"
    objects: {
      subscription: Prisma.$LoyaltySubscriptionPayload<ExtArgs>
      appointment: Prisma.$AppointmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subscriptionId: string
      appointmentId: string
      usedAt: Date
    }, ExtArgs["result"]["loyaltyUsage"]>
    composites: {}
  }

  type LoyaltyUsageGetPayload<S extends boolean | null | undefined | LoyaltyUsageDefaultArgs> = $Result.GetResult<Prisma.$LoyaltyUsagePayload, S>

  type LoyaltyUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoyaltyUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoyaltyUsageCountAggregateInputType | true
    }

  export interface LoyaltyUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoyaltyUsage'], meta: { name: 'LoyaltyUsage' } }
    /**
     * Find zero or one LoyaltyUsage that matches the filter.
     * @param {LoyaltyUsageFindUniqueArgs} args - Arguments to find a LoyaltyUsage
     * @example
     * // Get one LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoyaltyUsageFindUniqueArgs>(args: SelectSubset<T, LoyaltyUsageFindUniqueArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoyaltyUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoyaltyUsageFindUniqueOrThrowArgs} args - Arguments to find a LoyaltyUsage
     * @example
     * // Get one LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoyaltyUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, LoyaltyUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageFindFirstArgs} args - Arguments to find a LoyaltyUsage
     * @example
     * // Get one LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoyaltyUsageFindFirstArgs>(args?: SelectSubset<T, LoyaltyUsageFindFirstArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoyaltyUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageFindFirstOrThrowArgs} args - Arguments to find a LoyaltyUsage
     * @example
     * // Get one LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoyaltyUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, LoyaltyUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoyaltyUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoyaltyUsages
     * const loyaltyUsages = await prisma.loyaltyUsage.findMany()
     * 
     * // Get first 10 LoyaltyUsages
     * const loyaltyUsages = await prisma.loyaltyUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loyaltyUsageWithIdOnly = await prisma.loyaltyUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoyaltyUsageFindManyArgs>(args?: SelectSubset<T, LoyaltyUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoyaltyUsage.
     * @param {LoyaltyUsageCreateArgs} args - Arguments to create a LoyaltyUsage.
     * @example
     * // Create one LoyaltyUsage
     * const LoyaltyUsage = await prisma.loyaltyUsage.create({
     *   data: {
     *     // ... data to create a LoyaltyUsage
     *   }
     * })
     * 
     */
    create<T extends LoyaltyUsageCreateArgs>(args: SelectSubset<T, LoyaltyUsageCreateArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoyaltyUsages.
     * @param {LoyaltyUsageCreateManyArgs} args - Arguments to create many LoyaltyUsages.
     * @example
     * // Create many LoyaltyUsages
     * const loyaltyUsage = await prisma.loyaltyUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoyaltyUsageCreateManyArgs>(args?: SelectSubset<T, LoyaltyUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoyaltyUsages and returns the data saved in the database.
     * @param {LoyaltyUsageCreateManyAndReturnArgs} args - Arguments to create many LoyaltyUsages.
     * @example
     * // Create many LoyaltyUsages
     * const loyaltyUsage = await prisma.loyaltyUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoyaltyUsages and only return the `id`
     * const loyaltyUsageWithIdOnly = await prisma.loyaltyUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoyaltyUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, LoyaltyUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoyaltyUsage.
     * @param {LoyaltyUsageDeleteArgs} args - Arguments to delete one LoyaltyUsage.
     * @example
     * // Delete one LoyaltyUsage
     * const LoyaltyUsage = await prisma.loyaltyUsage.delete({
     *   where: {
     *     // ... filter to delete one LoyaltyUsage
     *   }
     * })
     * 
     */
    delete<T extends LoyaltyUsageDeleteArgs>(args: SelectSubset<T, LoyaltyUsageDeleteArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoyaltyUsage.
     * @param {LoyaltyUsageUpdateArgs} args - Arguments to update one LoyaltyUsage.
     * @example
     * // Update one LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoyaltyUsageUpdateArgs>(args: SelectSubset<T, LoyaltyUsageUpdateArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoyaltyUsages.
     * @param {LoyaltyUsageDeleteManyArgs} args - Arguments to filter LoyaltyUsages to delete.
     * @example
     * // Delete a few LoyaltyUsages
     * const { count } = await prisma.loyaltyUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoyaltyUsageDeleteManyArgs>(args?: SelectSubset<T, LoyaltyUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoyaltyUsages
     * const loyaltyUsage = await prisma.loyaltyUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoyaltyUsageUpdateManyArgs>(args: SelectSubset<T, LoyaltyUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoyaltyUsages and returns the data updated in the database.
     * @param {LoyaltyUsageUpdateManyAndReturnArgs} args - Arguments to update many LoyaltyUsages.
     * @example
     * // Update many LoyaltyUsages
     * const loyaltyUsage = await prisma.loyaltyUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoyaltyUsages and only return the `id`
     * const loyaltyUsageWithIdOnly = await prisma.loyaltyUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoyaltyUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, LoyaltyUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoyaltyUsage.
     * @param {LoyaltyUsageUpsertArgs} args - Arguments to update or create a LoyaltyUsage.
     * @example
     * // Update or create a LoyaltyUsage
     * const loyaltyUsage = await prisma.loyaltyUsage.upsert({
     *   create: {
     *     // ... data to create a LoyaltyUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoyaltyUsage we want to update
     *   }
     * })
     */
    upsert<T extends LoyaltyUsageUpsertArgs>(args: SelectSubset<T, LoyaltyUsageUpsertArgs<ExtArgs>>): Prisma__LoyaltyUsageClient<$Result.GetResult<Prisma.$LoyaltyUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoyaltyUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageCountArgs} args - Arguments to filter LoyaltyUsages to count.
     * @example
     * // Count the number of LoyaltyUsages
     * const count = await prisma.loyaltyUsage.count({
     *   where: {
     *     // ... the filter for the LoyaltyUsages we want to count
     *   }
     * })
    **/
    count<T extends LoyaltyUsageCountArgs>(
      args?: Subset<T, LoyaltyUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoyaltyUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoyaltyUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoyaltyUsageAggregateArgs>(args: Subset<T, LoyaltyUsageAggregateArgs>): Prisma.PrismaPromise<GetLoyaltyUsageAggregateType<T>>

    /**
     * Group by LoyaltyUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoyaltyUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoyaltyUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoyaltyUsageGroupByArgs['orderBy'] }
        : { orderBy?: LoyaltyUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoyaltyUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoyaltyUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoyaltyUsage model
   */
  readonly fields: LoyaltyUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoyaltyUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoyaltyUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends LoyaltySubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoyaltySubscriptionDefaultArgs<ExtArgs>>): Prisma__LoyaltySubscriptionClient<$Result.GetResult<Prisma.$LoyaltySubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends AppointmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppointmentDefaultArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoyaltyUsage model
   */
  interface LoyaltyUsageFieldRefs {
    readonly id: FieldRef<"LoyaltyUsage", 'String'>
    readonly subscriptionId: FieldRef<"LoyaltyUsage", 'String'>
    readonly appointmentId: FieldRef<"LoyaltyUsage", 'String'>
    readonly usedAt: FieldRef<"LoyaltyUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoyaltyUsage findUnique
   */
  export type LoyaltyUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyUsage to fetch.
     */
    where: LoyaltyUsageWhereUniqueInput
  }

  /**
   * LoyaltyUsage findUniqueOrThrow
   */
  export type LoyaltyUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyUsage to fetch.
     */
    where: LoyaltyUsageWhereUniqueInput
  }

  /**
   * LoyaltyUsage findFirst
   */
  export type LoyaltyUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyUsage to fetch.
     */
    where?: LoyaltyUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyUsages to fetch.
     */
    orderBy?: LoyaltyUsageOrderByWithRelationInput | LoyaltyUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyUsages.
     */
    cursor?: LoyaltyUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyUsages.
     */
    distinct?: LoyaltyUsageScalarFieldEnum | LoyaltyUsageScalarFieldEnum[]
  }

  /**
   * LoyaltyUsage findFirstOrThrow
   */
  export type LoyaltyUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyUsage to fetch.
     */
    where?: LoyaltyUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyUsages to fetch.
     */
    orderBy?: LoyaltyUsageOrderByWithRelationInput | LoyaltyUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoyaltyUsages.
     */
    cursor?: LoyaltyUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyUsages.
     */
    distinct?: LoyaltyUsageScalarFieldEnum | LoyaltyUsageScalarFieldEnum[]
  }

  /**
   * LoyaltyUsage findMany
   */
  export type LoyaltyUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter, which LoyaltyUsages to fetch.
     */
    where?: LoyaltyUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoyaltyUsages to fetch.
     */
    orderBy?: LoyaltyUsageOrderByWithRelationInput | LoyaltyUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoyaltyUsages.
     */
    cursor?: LoyaltyUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoyaltyUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoyaltyUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoyaltyUsages.
     */
    distinct?: LoyaltyUsageScalarFieldEnum | LoyaltyUsageScalarFieldEnum[]
  }

  /**
   * LoyaltyUsage create
   */
  export type LoyaltyUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a LoyaltyUsage.
     */
    data: XOR<LoyaltyUsageCreateInput, LoyaltyUsageUncheckedCreateInput>
  }

  /**
   * LoyaltyUsage createMany
   */
  export type LoyaltyUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoyaltyUsages.
     */
    data: LoyaltyUsageCreateManyInput | LoyaltyUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoyaltyUsage createManyAndReturn
   */
  export type LoyaltyUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * The data used to create many LoyaltyUsages.
     */
    data: LoyaltyUsageCreateManyInput | LoyaltyUsageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyUsage update
   */
  export type LoyaltyUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a LoyaltyUsage.
     */
    data: XOR<LoyaltyUsageUpdateInput, LoyaltyUsageUncheckedUpdateInput>
    /**
     * Choose, which LoyaltyUsage to update.
     */
    where: LoyaltyUsageWhereUniqueInput
  }

  /**
   * LoyaltyUsage updateMany
   */
  export type LoyaltyUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoyaltyUsages.
     */
    data: XOR<LoyaltyUsageUpdateManyMutationInput, LoyaltyUsageUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyUsages to update
     */
    where?: LoyaltyUsageWhereInput
    /**
     * Limit how many LoyaltyUsages to update.
     */
    limit?: number
  }

  /**
   * LoyaltyUsage updateManyAndReturn
   */
  export type LoyaltyUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * The data used to update LoyaltyUsages.
     */
    data: XOR<LoyaltyUsageUpdateManyMutationInput, LoyaltyUsageUncheckedUpdateManyInput>
    /**
     * Filter which LoyaltyUsages to update
     */
    where?: LoyaltyUsageWhereInput
    /**
     * Limit how many LoyaltyUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoyaltyUsage upsert
   */
  export type LoyaltyUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the LoyaltyUsage to update in case it exists.
     */
    where: LoyaltyUsageWhereUniqueInput
    /**
     * In case the LoyaltyUsage found by the `where` argument doesn't exist, create a new LoyaltyUsage with this data.
     */
    create: XOR<LoyaltyUsageCreateInput, LoyaltyUsageUncheckedCreateInput>
    /**
     * In case the LoyaltyUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoyaltyUsageUpdateInput, LoyaltyUsageUncheckedUpdateInput>
  }

  /**
   * LoyaltyUsage delete
   */
  export type LoyaltyUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
    /**
     * Filter which LoyaltyUsage to delete.
     */
    where: LoyaltyUsageWhereUniqueInput
  }

  /**
   * LoyaltyUsage deleteMany
   */
  export type LoyaltyUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoyaltyUsages to delete
     */
    where?: LoyaltyUsageWhereInput
    /**
     * Limit how many LoyaltyUsages to delete.
     */
    limit?: number
  }

  /**
   * LoyaltyUsage without action
   */
  export type LoyaltyUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoyaltyUsage
     */
    select?: LoyaltyUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoyaltyUsage
     */
    omit?: LoyaltyUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoyaltyUsageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    price: 'price',
    duration: 'duration',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    tenantSlug: 'tenantSlug',
    serviceId: 'serviceId',
    additionalServiceIds: 'additionalServiceIds',
    userId: 'userId',
    barberId: 'barberId',
    barberName: 'barberName',
    clientName: 'clientName',
    clientEmail: 'clientEmail',
    clientPhone: 'clientPhone',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    type: 'type',
    paymentIntentId: 'paymentIntentId',
    platformFee: 'platformFee',
    netAmount: 'netAmount',
    notes: 'notes',
    bookingSource: 'bookingSource',
    holdKind: 'holdKind',
    holdReason: 'holdReason',
    comandaLines: 'comandaLines',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    price: 'price',
    stock: 'stock',
    active: 'active',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    date: 'date',
    barberId: 'barberId',
    appointmentId: 'appointmentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const LoyaltyProgramScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    pointsRequired: 'pointsRequired',
    reward: 'reward',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoyaltyProgramScalarFieldEnum = (typeof LoyaltyProgramScalarFieldEnum)[keyof typeof LoyaltyProgramScalarFieldEnum]


  export const LoyaltyCardScalarFieldEnum: {
    id: 'id',
    loyaltyProgramId: 'loyaltyProgramId',
    userId: 'userId',
    points: 'points',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoyaltyCardScalarFieldEnum = (typeof LoyaltyCardScalarFieldEnum)[keyof typeof LoyaltyCardScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    content: 'content',
    type: 'type',
    read: 'read',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const LoyaltyPlanScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    price: 'price',
    interval: 'interval',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoyaltyPlanScalarFieldEnum = (typeof LoyaltyPlanScalarFieldEnum)[keyof typeof LoyaltyPlanScalarFieldEnum]


  export const LoyaltyPlanItemScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    serviceId: 'serviceId',
    quantity: 'quantity',
    allowedDays: 'allowedDays',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoyaltyPlanItemScalarFieldEnum = (typeof LoyaltyPlanItemScalarFieldEnum)[keyof typeof LoyaltyPlanItemScalarFieldEnum]


  export const LoyaltySubscriptionScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    userId: 'userId',
    barberId: 'barberId',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoyaltySubscriptionScalarFieldEnum = (typeof LoyaltySubscriptionScalarFieldEnum)[keyof typeof LoyaltySubscriptionScalarFieldEnum]


  export const LoyaltyUsageScalarFieldEnum: {
    id: 'id',
    subscriptionId: 'subscriptionId',
    appointmentId: 'appointmentId',
    usedAt: 'usedAt'
  };

  export type LoyaltyUsageScalarFieldEnum = (typeof LoyaltyUsageScalarFieldEnum)[keyof typeof LoyaltyUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'AppointmentType'
   */
  export type EnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType'>
    


  /**
   * Reference to a field of type 'AppointmentType[]'
   */
  export type ListEnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'LoyaltyPlanInterval'
   */
  export type EnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyPlanInterval'>
    


  /**
   * Reference to a field of type 'LoyaltyPlanInterval[]'
   */
  export type ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoyaltyPlanInterval[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    tenantId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    duration?: IntFilter<"Service"> | number
    active?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    appointments?: AppointmentListRelationFilter
    loyaltyPlanItems?: LoyaltyPlanItemListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appointments?: AppointmentOrderByRelationAggregateInput
    loyaltyPlanItems?: LoyaltyPlanItemOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    tenantId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    duration?: IntFilter<"Service"> | number
    active?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    appointments?: AppointmentListRelationFilter
    loyaltyPlanItems?: LoyaltyPlanItemListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    tenantId?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    price?: DecimalWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string
    duration?: IntWithAggregatesFilter<"Service"> | number
    active?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    tenantId?: StringFilter<"Appointment"> | string
    tenantSlug?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    additionalServiceIds?: StringNullableListFilter<"Appointment">
    userId?: StringNullableFilter<"Appointment"> | string | null
    barberId?: StringNullableFilter<"Appointment"> | string | null
    barberName?: StringNullableFilter<"Appointment"> | string | null
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringNullableFilter<"Appointment"> | string | null
    clientPhone?: StringNullableFilter<"Appointment"> | string | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    paymentIntentId?: StringNullableFilter<"Appointment"> | string | null
    platformFee?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    netAmount?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    bookingSource?: StringNullableFilter<"Appointment"> | string | null
    holdKind?: StringFilter<"Appointment"> | string
    holdReason?: StringNullableFilter<"Appointment"> | string | null
    comandaLines?: JsonNullableFilter<"Appointment">
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    loyaltyUsage?: XOR<LoyaltyUsageNullableScalarRelationFilter, LoyaltyUsageWhereInput> | null
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    tenantSlug?: SortOrder
    serviceId?: SortOrder
    additionalServiceIds?: SortOrder
    userId?: SortOrderInput | SortOrder
    barberId?: SortOrderInput | SortOrder
    barberName?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrderInput | SortOrder
    clientPhone?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    type?: SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    platformFee?: SortOrderInput | SortOrder
    netAmount?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bookingSource?: SortOrderInput | SortOrder
    holdKind?: SortOrder
    holdReason?: SortOrderInput | SortOrder
    comandaLines?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    service?: ServiceOrderByWithRelationInput
    loyaltyUsage?: LoyaltyUsageOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    tenantId?: StringFilter<"Appointment"> | string
    tenantSlug?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    additionalServiceIds?: StringNullableListFilter<"Appointment">
    userId?: StringNullableFilter<"Appointment"> | string | null
    barberId?: StringNullableFilter<"Appointment"> | string | null
    barberName?: StringNullableFilter<"Appointment"> | string | null
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringNullableFilter<"Appointment"> | string | null
    clientPhone?: StringNullableFilter<"Appointment"> | string | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    paymentIntentId?: StringNullableFilter<"Appointment"> | string | null
    platformFee?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    netAmount?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    bookingSource?: StringNullableFilter<"Appointment"> | string | null
    holdKind?: StringFilter<"Appointment"> | string
    holdReason?: StringNullableFilter<"Appointment"> | string | null
    comandaLines?: JsonNullableFilter<"Appointment">
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    loyaltyUsage?: XOR<LoyaltyUsageNullableScalarRelationFilter, LoyaltyUsageWhereInput> | null
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    tenantSlug?: SortOrder
    serviceId?: SortOrder
    additionalServiceIds?: SortOrder
    userId?: SortOrderInput | SortOrder
    barberId?: SortOrderInput | SortOrder
    barberName?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrderInput | SortOrder
    clientPhone?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    type?: SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    platformFee?: SortOrderInput | SortOrder
    netAmount?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bookingSource?: SortOrderInput | SortOrder
    holdKind?: SortOrder
    holdReason?: SortOrderInput | SortOrder
    comandaLines?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    tenantId?: StringWithAggregatesFilter<"Appointment"> | string
    tenantSlug?: StringWithAggregatesFilter<"Appointment"> | string
    serviceId?: StringWithAggregatesFilter<"Appointment"> | string
    additionalServiceIds?: StringNullableListFilter<"Appointment">
    userId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    barberId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    barberName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    clientName?: StringWithAggregatesFilter<"Appointment"> | string
    clientEmail?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    clientPhone?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeWithAggregatesFilter<"Appointment"> | $Enums.AppointmentType
    paymentIntentId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    platformFee?: DecimalNullableWithAggregatesFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    netAmount?: DecimalNullableWithAggregatesFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    bookingSource?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    holdKind?: StringWithAggregatesFilter<"Appointment"> | string
    holdReason?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    comandaLines?: JsonNullableWithAggregatesFilter<"Appointment">
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    tenantId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    active?: BoolFilter<"Product"> | boolean
    imageUrl?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    active?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    tenantId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    active?: BoolFilter<"Product"> | boolean
    imageUrl?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    active?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    tenantId?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"Product"> | number
    active?: BoolWithAggregatesFilter<"Product"> | boolean
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    tenantId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    barberId?: StringNullableFilter<"Transaction"> | string | null
    appointmentId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    barberId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    tenantId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    barberId?: StringNullableFilter<"Transaction"> | string | null
    appointmentId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    barberId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    tenantId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringWithAggregatesFilter<"Transaction"> | string
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    barberId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    appointmentId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type LoyaltyProgramWhereInput = {
    AND?: LoyaltyProgramWhereInput | LoyaltyProgramWhereInput[]
    OR?: LoyaltyProgramWhereInput[]
    NOT?: LoyaltyProgramWhereInput | LoyaltyProgramWhereInput[]
    id?: StringFilter<"LoyaltyProgram"> | string
    tenantId?: StringFilter<"LoyaltyProgram"> | string
    name?: StringFilter<"LoyaltyProgram"> | string
    pointsRequired?: IntFilter<"LoyaltyProgram"> | number
    reward?: StringFilter<"LoyaltyProgram"> | string
    active?: BoolFilter<"LoyaltyProgram"> | boolean
    createdAt?: DateTimeFilter<"LoyaltyProgram"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyProgram"> | Date | string
    cards?: LoyaltyCardListRelationFilter
  }

  export type LoyaltyProgramOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    pointsRequired?: SortOrder
    reward?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cards?: LoyaltyCardOrderByRelationAggregateInput
  }

  export type LoyaltyProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoyaltyProgramWhereInput | LoyaltyProgramWhereInput[]
    OR?: LoyaltyProgramWhereInput[]
    NOT?: LoyaltyProgramWhereInput | LoyaltyProgramWhereInput[]
    tenantId?: StringFilter<"LoyaltyProgram"> | string
    name?: StringFilter<"LoyaltyProgram"> | string
    pointsRequired?: IntFilter<"LoyaltyProgram"> | number
    reward?: StringFilter<"LoyaltyProgram"> | string
    active?: BoolFilter<"LoyaltyProgram"> | boolean
    createdAt?: DateTimeFilter<"LoyaltyProgram"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyProgram"> | Date | string
    cards?: LoyaltyCardListRelationFilter
  }, "id">

  export type LoyaltyProgramOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    pointsRequired?: SortOrder
    reward?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoyaltyProgramCountOrderByAggregateInput
    _avg?: LoyaltyProgramAvgOrderByAggregateInput
    _max?: LoyaltyProgramMaxOrderByAggregateInput
    _min?: LoyaltyProgramMinOrderByAggregateInput
    _sum?: LoyaltyProgramSumOrderByAggregateInput
  }

  export type LoyaltyProgramScalarWhereWithAggregatesInput = {
    AND?: LoyaltyProgramScalarWhereWithAggregatesInput | LoyaltyProgramScalarWhereWithAggregatesInput[]
    OR?: LoyaltyProgramScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyProgramScalarWhereWithAggregatesInput | LoyaltyProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltyProgram"> | string
    tenantId?: StringWithAggregatesFilter<"LoyaltyProgram"> | string
    name?: StringWithAggregatesFilter<"LoyaltyProgram"> | string
    pointsRequired?: IntWithAggregatesFilter<"LoyaltyProgram"> | number
    reward?: StringWithAggregatesFilter<"LoyaltyProgram"> | string
    active?: BoolWithAggregatesFilter<"LoyaltyProgram"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LoyaltyProgram"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoyaltyProgram"> | Date | string
  }

  export type LoyaltyCardWhereInput = {
    AND?: LoyaltyCardWhereInput | LoyaltyCardWhereInput[]
    OR?: LoyaltyCardWhereInput[]
    NOT?: LoyaltyCardWhereInput | LoyaltyCardWhereInput[]
    id?: StringFilter<"LoyaltyCard"> | string
    loyaltyProgramId?: StringFilter<"LoyaltyCard"> | string
    userId?: StringFilter<"LoyaltyCard"> | string
    points?: IntFilter<"LoyaltyCard"> | number
    createdAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
    loyaltyProgram?: XOR<LoyaltyProgramScalarRelationFilter, LoyaltyProgramWhereInput>
  }

  export type LoyaltyCardOrderByWithRelationInput = {
    id?: SortOrder
    loyaltyProgramId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loyaltyProgram?: LoyaltyProgramOrderByWithRelationInput
  }

  export type LoyaltyCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_loyaltyProgramId?: LoyaltyCardUserIdLoyaltyProgramIdCompoundUniqueInput
    AND?: LoyaltyCardWhereInput | LoyaltyCardWhereInput[]
    OR?: LoyaltyCardWhereInput[]
    NOT?: LoyaltyCardWhereInput | LoyaltyCardWhereInput[]
    loyaltyProgramId?: StringFilter<"LoyaltyCard"> | string
    userId?: StringFilter<"LoyaltyCard"> | string
    points?: IntFilter<"LoyaltyCard"> | number
    createdAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
    loyaltyProgram?: XOR<LoyaltyProgramScalarRelationFilter, LoyaltyProgramWhereInput>
  }, "id" | "userId_loyaltyProgramId">

  export type LoyaltyCardOrderByWithAggregationInput = {
    id?: SortOrder
    loyaltyProgramId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoyaltyCardCountOrderByAggregateInput
    _avg?: LoyaltyCardAvgOrderByAggregateInput
    _max?: LoyaltyCardMaxOrderByAggregateInput
    _min?: LoyaltyCardMinOrderByAggregateInput
    _sum?: LoyaltyCardSumOrderByAggregateInput
  }

  export type LoyaltyCardScalarWhereWithAggregatesInput = {
    AND?: LoyaltyCardScalarWhereWithAggregatesInput | LoyaltyCardScalarWhereWithAggregatesInput[]
    OR?: LoyaltyCardScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyCardScalarWhereWithAggregatesInput | LoyaltyCardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltyCard"> | string
    loyaltyProgramId?: StringWithAggregatesFilter<"LoyaltyCard"> | string
    userId?: StringWithAggregatesFilter<"LoyaltyCard"> | string
    points?: IntWithAggregatesFilter<"LoyaltyCard"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LoyaltyCard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoyaltyCard"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    type?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    type?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    content?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type LoyaltyPlanWhereInput = {
    AND?: LoyaltyPlanWhereInput | LoyaltyPlanWhereInput[]
    OR?: LoyaltyPlanWhereInput[]
    NOT?: LoyaltyPlanWhereInput | LoyaltyPlanWhereInput[]
    id?: StringFilter<"LoyaltyPlan"> | string
    tenantId?: StringFilter<"LoyaltyPlan"> | string
    name?: StringFilter<"LoyaltyPlan"> | string
    description?: StringNullableFilter<"LoyaltyPlan"> | string | null
    price?: DecimalFilter<"LoyaltyPlan"> | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFilter<"LoyaltyPlan"> | $Enums.LoyaltyPlanInterval
    active?: BoolFilter<"LoyaltyPlan"> | boolean
    createdAt?: DateTimeFilter<"LoyaltyPlan"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyPlan"> | Date | string
    items?: LoyaltyPlanItemListRelationFilter
    subscriptions?: LoyaltySubscriptionListRelationFilter
  }

  export type LoyaltyPlanOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    interval?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: LoyaltyPlanItemOrderByRelationAggregateInput
    subscriptions?: LoyaltySubscriptionOrderByRelationAggregateInput
  }

  export type LoyaltyPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoyaltyPlanWhereInput | LoyaltyPlanWhereInput[]
    OR?: LoyaltyPlanWhereInput[]
    NOT?: LoyaltyPlanWhereInput | LoyaltyPlanWhereInput[]
    tenantId?: StringFilter<"LoyaltyPlan"> | string
    name?: StringFilter<"LoyaltyPlan"> | string
    description?: StringNullableFilter<"LoyaltyPlan"> | string | null
    price?: DecimalFilter<"LoyaltyPlan"> | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFilter<"LoyaltyPlan"> | $Enums.LoyaltyPlanInterval
    active?: BoolFilter<"LoyaltyPlan"> | boolean
    createdAt?: DateTimeFilter<"LoyaltyPlan"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyPlan"> | Date | string
    items?: LoyaltyPlanItemListRelationFilter
    subscriptions?: LoyaltySubscriptionListRelationFilter
  }, "id">

  export type LoyaltyPlanOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    interval?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoyaltyPlanCountOrderByAggregateInput
    _avg?: LoyaltyPlanAvgOrderByAggregateInput
    _max?: LoyaltyPlanMaxOrderByAggregateInput
    _min?: LoyaltyPlanMinOrderByAggregateInput
    _sum?: LoyaltyPlanSumOrderByAggregateInput
  }

  export type LoyaltyPlanScalarWhereWithAggregatesInput = {
    AND?: LoyaltyPlanScalarWhereWithAggregatesInput | LoyaltyPlanScalarWhereWithAggregatesInput[]
    OR?: LoyaltyPlanScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyPlanScalarWhereWithAggregatesInput | LoyaltyPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltyPlan"> | string
    tenantId?: StringWithAggregatesFilter<"LoyaltyPlan"> | string
    name?: StringWithAggregatesFilter<"LoyaltyPlan"> | string
    description?: StringNullableWithAggregatesFilter<"LoyaltyPlan"> | string | null
    price?: DecimalWithAggregatesFilter<"LoyaltyPlan"> | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalWithAggregatesFilter<"LoyaltyPlan"> | $Enums.LoyaltyPlanInterval
    active?: BoolWithAggregatesFilter<"LoyaltyPlan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LoyaltyPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoyaltyPlan"> | Date | string
  }

  export type LoyaltyPlanItemWhereInput = {
    AND?: LoyaltyPlanItemWhereInput | LoyaltyPlanItemWhereInput[]
    OR?: LoyaltyPlanItemWhereInput[]
    NOT?: LoyaltyPlanItemWhereInput | LoyaltyPlanItemWhereInput[]
    id?: StringFilter<"LoyaltyPlanItem"> | string
    planId?: StringFilter<"LoyaltyPlanItem"> | string
    serviceId?: StringFilter<"LoyaltyPlanItem"> | string
    quantity?: IntFilter<"LoyaltyPlanItem"> | number
    allowedDays?: IntNullableListFilter<"LoyaltyPlanItem">
    createdAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
    plan?: XOR<LoyaltyPlanScalarRelationFilter, LoyaltyPlanWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type LoyaltyPlanItemOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    allowedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: LoyaltyPlanOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type LoyaltyPlanItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoyaltyPlanItemWhereInput | LoyaltyPlanItemWhereInput[]
    OR?: LoyaltyPlanItemWhereInput[]
    NOT?: LoyaltyPlanItemWhereInput | LoyaltyPlanItemWhereInput[]
    planId?: StringFilter<"LoyaltyPlanItem"> | string
    serviceId?: StringFilter<"LoyaltyPlanItem"> | string
    quantity?: IntFilter<"LoyaltyPlanItem"> | number
    allowedDays?: IntNullableListFilter<"LoyaltyPlanItem">
    createdAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
    plan?: XOR<LoyaltyPlanScalarRelationFilter, LoyaltyPlanWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type LoyaltyPlanItemOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    allowedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoyaltyPlanItemCountOrderByAggregateInput
    _avg?: LoyaltyPlanItemAvgOrderByAggregateInput
    _max?: LoyaltyPlanItemMaxOrderByAggregateInput
    _min?: LoyaltyPlanItemMinOrderByAggregateInput
    _sum?: LoyaltyPlanItemSumOrderByAggregateInput
  }

  export type LoyaltyPlanItemScalarWhereWithAggregatesInput = {
    AND?: LoyaltyPlanItemScalarWhereWithAggregatesInput | LoyaltyPlanItemScalarWhereWithAggregatesInput[]
    OR?: LoyaltyPlanItemScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyPlanItemScalarWhereWithAggregatesInput | LoyaltyPlanItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltyPlanItem"> | string
    planId?: StringWithAggregatesFilter<"LoyaltyPlanItem"> | string
    serviceId?: StringWithAggregatesFilter<"LoyaltyPlanItem"> | string
    quantity?: IntWithAggregatesFilter<"LoyaltyPlanItem"> | number
    allowedDays?: IntNullableListFilter<"LoyaltyPlanItem">
    createdAt?: DateTimeWithAggregatesFilter<"LoyaltyPlanItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoyaltyPlanItem"> | Date | string
  }

  export type LoyaltySubscriptionWhereInput = {
    AND?: LoyaltySubscriptionWhereInput | LoyaltySubscriptionWhereInput[]
    OR?: LoyaltySubscriptionWhereInput[]
    NOT?: LoyaltySubscriptionWhereInput | LoyaltySubscriptionWhereInput[]
    id?: StringFilter<"LoyaltySubscription"> | string
    planId?: StringFilter<"LoyaltySubscription"> | string
    userId?: StringFilter<"LoyaltySubscription"> | string
    barberId?: StringNullableFilter<"LoyaltySubscription"> | string | null
    status?: StringFilter<"LoyaltySubscription"> | string
    startDate?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    endDate?: DateTimeNullableFilter<"LoyaltySubscription"> | Date | string | null
    createdAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    plan?: XOR<LoyaltyPlanScalarRelationFilter, LoyaltyPlanWhereInput>
    usages?: LoyaltyUsageListRelationFilter
  }

  export type LoyaltySubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrderInput | SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: LoyaltyPlanOrderByWithRelationInput
    usages?: LoyaltyUsageOrderByRelationAggregateInput
  }

  export type LoyaltySubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoyaltySubscriptionWhereInput | LoyaltySubscriptionWhereInput[]
    OR?: LoyaltySubscriptionWhereInput[]
    NOT?: LoyaltySubscriptionWhereInput | LoyaltySubscriptionWhereInput[]
    planId?: StringFilter<"LoyaltySubscription"> | string
    userId?: StringFilter<"LoyaltySubscription"> | string
    barberId?: StringNullableFilter<"LoyaltySubscription"> | string | null
    status?: StringFilter<"LoyaltySubscription"> | string
    startDate?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    endDate?: DateTimeNullableFilter<"LoyaltySubscription"> | Date | string | null
    createdAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    plan?: XOR<LoyaltyPlanScalarRelationFilter, LoyaltyPlanWhereInput>
    usages?: LoyaltyUsageListRelationFilter
  }, "id">

  export type LoyaltySubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrderInput | SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoyaltySubscriptionCountOrderByAggregateInput
    _max?: LoyaltySubscriptionMaxOrderByAggregateInput
    _min?: LoyaltySubscriptionMinOrderByAggregateInput
  }

  export type LoyaltySubscriptionScalarWhereWithAggregatesInput = {
    AND?: LoyaltySubscriptionScalarWhereWithAggregatesInput | LoyaltySubscriptionScalarWhereWithAggregatesInput[]
    OR?: LoyaltySubscriptionScalarWhereWithAggregatesInput[]
    NOT?: LoyaltySubscriptionScalarWhereWithAggregatesInput | LoyaltySubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltySubscription"> | string
    planId?: StringWithAggregatesFilter<"LoyaltySubscription"> | string
    userId?: StringWithAggregatesFilter<"LoyaltySubscription"> | string
    barberId?: StringNullableWithAggregatesFilter<"LoyaltySubscription"> | string | null
    status?: StringWithAggregatesFilter<"LoyaltySubscription"> | string
    startDate?: DateTimeWithAggregatesFilter<"LoyaltySubscription"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"LoyaltySubscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LoyaltySubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoyaltySubscription"> | Date | string
  }

  export type LoyaltyUsageWhereInput = {
    AND?: LoyaltyUsageWhereInput | LoyaltyUsageWhereInput[]
    OR?: LoyaltyUsageWhereInput[]
    NOT?: LoyaltyUsageWhereInput | LoyaltyUsageWhereInput[]
    id?: StringFilter<"LoyaltyUsage"> | string
    subscriptionId?: StringFilter<"LoyaltyUsage"> | string
    appointmentId?: StringFilter<"LoyaltyUsage"> | string
    usedAt?: DateTimeFilter<"LoyaltyUsage"> | Date | string
    subscription?: XOR<LoyaltySubscriptionScalarRelationFilter, LoyaltySubscriptionWhereInput>
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
  }

  export type LoyaltyUsageOrderByWithRelationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    appointmentId?: SortOrder
    usedAt?: SortOrder
    subscription?: LoyaltySubscriptionOrderByWithRelationInput
    appointment?: AppointmentOrderByWithRelationInput
  }

  export type LoyaltyUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appointmentId?: string
    AND?: LoyaltyUsageWhereInput | LoyaltyUsageWhereInput[]
    OR?: LoyaltyUsageWhereInput[]
    NOT?: LoyaltyUsageWhereInput | LoyaltyUsageWhereInput[]
    subscriptionId?: StringFilter<"LoyaltyUsage"> | string
    usedAt?: DateTimeFilter<"LoyaltyUsage"> | Date | string
    subscription?: XOR<LoyaltySubscriptionScalarRelationFilter, LoyaltySubscriptionWhereInput>
    appointment?: XOR<AppointmentScalarRelationFilter, AppointmentWhereInput>
  }, "id" | "appointmentId">

  export type LoyaltyUsageOrderByWithAggregationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    appointmentId?: SortOrder
    usedAt?: SortOrder
    _count?: LoyaltyUsageCountOrderByAggregateInput
    _max?: LoyaltyUsageMaxOrderByAggregateInput
    _min?: LoyaltyUsageMinOrderByAggregateInput
  }

  export type LoyaltyUsageScalarWhereWithAggregatesInput = {
    AND?: LoyaltyUsageScalarWhereWithAggregatesInput | LoyaltyUsageScalarWhereWithAggregatesInput[]
    OR?: LoyaltyUsageScalarWhereWithAggregatesInput[]
    NOT?: LoyaltyUsageScalarWhereWithAggregatesInput | LoyaltyUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoyaltyUsage"> | string
    subscriptionId?: StringWithAggregatesFilter<"LoyaltyUsage"> | string
    appointmentId?: StringWithAggregatesFilter<"LoyaltyUsage"> | string
    usedAt?: DateTimeWithAggregatesFilter<"LoyaltyUsage"> | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
    loyaltyPlanItems?: LoyaltyPlanItemCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
    loyaltyPlanItems?: LoyaltyPlanItemUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
    loyaltyPlanItems?: LoyaltyPlanItemUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
    loyaltyPlanItems?: LoyaltyPlanItemUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutAppointmentsInput
    loyaltyUsage?: LoyaltyUsageCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    serviceId: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyUsage?: LoyaltyUsageUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
    loyaltyUsage?: LoyaltyUsageUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyUsage?: LoyaltyUsageUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentCreateManyInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    serviceId: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    active?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    active?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    active?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    tenantId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    description: string
    date?: Date | string
    barberId?: string | null
    appointmentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    tenantId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    description: string
    date?: Date | string
    barberId?: string | null
    appointmentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    tenantId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    description: string
    date?: Date | string
    barberId?: string | null
    appointmentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyProgramCreateInput = {
    id?: string
    tenantId: string
    name: string
    pointsRequired?: number
    reward: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: LoyaltyCardCreateNestedManyWithoutLoyaltyProgramInput
  }

  export type LoyaltyProgramUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    pointsRequired?: number
    reward: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: LoyaltyCardUncheckedCreateNestedManyWithoutLoyaltyProgramInput
  }

  export type LoyaltyProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: LoyaltyCardUpdateManyWithoutLoyaltyProgramNestedInput
  }

  export type LoyaltyProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: LoyaltyCardUncheckedUpdateManyWithoutLoyaltyProgramNestedInput
  }

  export type LoyaltyProgramCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    pointsRequired?: number
    reward: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardCreateInput = {
    id?: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyProgram: LoyaltyProgramCreateNestedOneWithoutCardsInput
  }

  export type LoyaltyCardUncheckedCreateInput = {
    id?: string
    loyaltyProgramId: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyCardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyProgram?: LoyaltyProgramUpdateOneRequiredWithoutCardsNestedInput
  }

  export type LoyaltyCardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loyaltyProgramId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardCreateManyInput = {
    id?: string
    loyaltyProgramId: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyCardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loyaltyProgramId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    title: string
    content: string
    type?: $Enums.NotificationType
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    content: string
    type?: $Enums.NotificationType
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    content: string
    type?: $Enums.NotificationType
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LoyaltyPlanItemCreateNestedManyWithoutPlanInput
    subscriptions?: LoyaltySubscriptionCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LoyaltyPlanItemUncheckedCreateNestedManyWithoutPlanInput
    subscriptions?: LoyaltySubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LoyaltyPlanItemUpdateManyWithoutPlanNestedInput
    subscriptions?: LoyaltySubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type LoyaltyPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LoyaltyPlanItemUncheckedUpdateManyWithoutPlanNestedInput
    subscriptions?: LoyaltySubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type LoyaltyPlanCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemCreateInput = {
    id?: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: LoyaltyPlanCreateNestedOneWithoutItemsInput
    service: ServiceCreateNestedOneWithoutLoyaltyPlanItemsInput
  }

  export type LoyaltyPlanItemUncheckedCreateInput = {
    id?: string
    planId: string
    serviceId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: LoyaltyPlanUpdateOneRequiredWithoutItemsNestedInput
    service?: ServiceUpdateOneRequiredWithoutLoyaltyPlanItemsNestedInput
  }

  export type LoyaltyPlanItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemCreateManyInput = {
    id?: string
    planId: string
    serviceId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltySubscriptionCreateInput = {
    id?: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: LoyaltyPlanCreateNestedOneWithoutSubscriptionsInput
    usages?: LoyaltyUsageCreateNestedManyWithoutSubscriptionInput
  }

  export type LoyaltySubscriptionUncheckedCreateInput = {
    id?: string
    planId: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usages?: LoyaltyUsageUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type LoyaltySubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: LoyaltyPlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    usages?: LoyaltyUsageUpdateManyWithoutSubscriptionNestedInput
  }

  export type LoyaltySubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usages?: LoyaltyUsageUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type LoyaltySubscriptionCreateManyInput = {
    id?: string
    planId: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltySubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltySubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyUsageCreateInput = {
    id?: string
    usedAt?: Date | string
    subscription: LoyaltySubscriptionCreateNestedOneWithoutUsagesInput
    appointment: AppointmentCreateNestedOneWithoutLoyaltyUsageInput
  }

  export type LoyaltyUsageUncheckedCreateInput = {
    id?: string
    subscriptionId: string
    appointmentId: string
    usedAt?: Date | string
  }

  export type LoyaltyUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: LoyaltySubscriptionUpdateOneRequiredWithoutUsagesNestedInput
    appointment?: AppointmentUpdateOneRequiredWithoutLoyaltyUsageNestedInput
  }

  export type LoyaltyUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyUsageCreateManyInput = {
    id?: string
    subscriptionId: string
    appointmentId: string
    usedAt?: Date | string
  }

  export type LoyaltyUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type LoyaltyPlanItemListRelationFilter = {
    every?: LoyaltyPlanItemWhereInput
    some?: LoyaltyPlanItemWhereInput
    none?: LoyaltyPlanItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoyaltyPlanItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type EnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type LoyaltyUsageNullableScalarRelationFilter = {
    is?: LoyaltyUsageWhereInput | null
    isNot?: LoyaltyUsageWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    tenantSlug?: SortOrder
    serviceId?: SortOrder
    additionalServiceIds?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    barberName?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    type?: SortOrder
    paymentIntentId?: SortOrder
    platformFee?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    bookingSource?: SortOrder
    holdKind?: SortOrder
    holdReason?: SortOrder
    comandaLines?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    platformFee?: SortOrder
    netAmount?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    tenantSlug?: SortOrder
    serviceId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    barberName?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    type?: SortOrder
    paymentIntentId?: SortOrder
    platformFee?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    bookingSource?: SortOrder
    holdKind?: SortOrder
    holdReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    tenantSlug?: SortOrder
    serviceId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    barberName?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    type?: SortOrder
    paymentIntentId?: SortOrder
    platformFee?: SortOrder
    netAmount?: SortOrder
    notes?: SortOrder
    bookingSource?: SortOrder
    holdKind?: SortOrder
    holdReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    platformFee?: SortOrder
    netAmount?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type EnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    active?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    active?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    active?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    barberId?: SortOrder
    appointmentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    barberId?: SortOrder
    appointmentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    barberId?: SortOrder
    appointmentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type LoyaltyCardListRelationFilter = {
    every?: LoyaltyCardWhereInput
    some?: LoyaltyCardWhereInput
    none?: LoyaltyCardWhereInput
  }

  export type LoyaltyCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoyaltyProgramCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    pointsRequired?: SortOrder
    reward?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyProgramAvgOrderByAggregateInput = {
    pointsRequired?: SortOrder
  }

  export type LoyaltyProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    pointsRequired?: SortOrder
    reward?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyProgramMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    pointsRequired?: SortOrder
    reward?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyProgramSumOrderByAggregateInput = {
    pointsRequired?: SortOrder
  }

  export type LoyaltyProgramScalarRelationFilter = {
    is?: LoyaltyProgramWhereInput
    isNot?: LoyaltyProgramWhereInput
  }

  export type LoyaltyCardUserIdLoyaltyProgramIdCompoundUniqueInput = {
    userId: string
    loyaltyProgramId: string
  }

  export type LoyaltyCardCountOrderByAggregateInput = {
    id?: SortOrder
    loyaltyProgramId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyCardAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type LoyaltyCardMaxOrderByAggregateInput = {
    id?: SortOrder
    loyaltyProgramId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyCardMinOrderByAggregateInput = {
    id?: SortOrder
    loyaltyProgramId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyCardSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    type?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    type?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    type?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumLoyaltyPlanIntervalFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyPlanInterval | EnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel> | $Enums.LoyaltyPlanInterval
  }

  export type LoyaltySubscriptionListRelationFilter = {
    every?: LoyaltySubscriptionWhereInput
    some?: LoyaltySubscriptionWhereInput
    none?: LoyaltySubscriptionWhereInput
  }

  export type LoyaltySubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoyaltyPlanCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    interval?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type LoyaltyPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    interval?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    interval?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumLoyaltyPlanIntervalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyPlanInterval | EnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyPlanIntervalWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyPlanInterval
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type LoyaltyPlanScalarRelationFilter = {
    is?: LoyaltyPlanWhereInput
    isNot?: LoyaltyPlanWhereInput
  }

  export type LoyaltyPlanItemCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    allowedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    allowedDays?: SortOrder
  }

  export type LoyaltyPlanItemMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanItemMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    serviceId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltyPlanItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    allowedDays?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LoyaltyUsageListRelationFilter = {
    every?: LoyaltyUsageWhereInput
    some?: LoyaltyUsageWhereInput
    none?: LoyaltyUsageWhereInput
  }

  export type LoyaltyUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoyaltySubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltySubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoyaltySubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    userId?: SortOrder
    barberId?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type LoyaltySubscriptionScalarRelationFilter = {
    is?: LoyaltySubscriptionWhereInput
    isNot?: LoyaltySubscriptionWhereInput
  }

  export type AppointmentScalarRelationFilter = {
    is?: AppointmentWhereInput
    isNot?: AppointmentWhereInput
  }

  export type LoyaltyUsageCountOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    appointmentId?: SortOrder
    usedAt?: SortOrder
  }

  export type LoyaltyUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    appointmentId?: SortOrder
    usedAt?: SortOrder
  }

  export type LoyaltyUsageMinOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    appointmentId?: SortOrder
    usedAt?: SortOrder
  }

  export type AppointmentCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type LoyaltyPlanItemCreateNestedManyWithoutServiceInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput> | LoyaltyPlanItemCreateWithoutServiceInput[] | LoyaltyPlanItemUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutServiceInput | LoyaltyPlanItemCreateOrConnectWithoutServiceInput[]
    createMany?: LoyaltyPlanItemCreateManyServiceInputEnvelope
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type LoyaltyPlanItemUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput> | LoyaltyPlanItemCreateWithoutServiceInput[] | LoyaltyPlanItemUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutServiceInput | LoyaltyPlanItemCreateOrConnectWithoutServiceInput[]
    createMany?: LoyaltyPlanItemCreateManyServiceInputEnvelope
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AppointmentUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type LoyaltyPlanItemUpdateManyWithoutServiceNestedInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput> | LoyaltyPlanItemCreateWithoutServiceInput[] | LoyaltyPlanItemUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutServiceInput | LoyaltyPlanItemCreateOrConnectWithoutServiceInput[]
    upsert?: LoyaltyPlanItemUpsertWithWhereUniqueWithoutServiceInput | LoyaltyPlanItemUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: LoyaltyPlanItemCreateManyServiceInputEnvelope
    set?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    disconnect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    delete?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    update?: LoyaltyPlanItemUpdateWithWhereUniqueWithoutServiceInput | LoyaltyPlanItemUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: LoyaltyPlanItemUpdateManyWithWhereWithoutServiceInput | LoyaltyPlanItemUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type LoyaltyPlanItemUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput> | LoyaltyPlanItemCreateWithoutServiceInput[] | LoyaltyPlanItemUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutServiceInput | LoyaltyPlanItemCreateOrConnectWithoutServiceInput[]
    upsert?: LoyaltyPlanItemUpsertWithWhereUniqueWithoutServiceInput | LoyaltyPlanItemUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: LoyaltyPlanItemCreateManyServiceInputEnvelope
    set?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    disconnect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    delete?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    update?: LoyaltyPlanItemUpdateWithWhereUniqueWithoutServiceInput | LoyaltyPlanItemUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: LoyaltyPlanItemUpdateManyWithWhereWithoutServiceInput | LoyaltyPlanItemUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
  }

  export type AppointmentCreateadditionalServiceIdsInput = {
    set: string[]
  }

  export type ServiceCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
  }

  export type LoyaltyUsageCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutAppointmentInput
    connect?: LoyaltyUsageWhereUniqueInput
  }

  export type LoyaltyUsageUncheckedCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutAppointmentInput
    connect?: LoyaltyUsageWhereUniqueInput
  }

  export type AppointmentUpdateadditionalServiceIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type EnumAppointmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ServiceUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    upsert?: ServiceUpsertWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAppointmentsInput, ServiceUpdateWithoutAppointmentsInput>, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type LoyaltyUsageUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutAppointmentInput
    upsert?: LoyaltyUsageUpsertWithoutAppointmentInput
    disconnect?: LoyaltyUsageWhereInput | boolean
    delete?: LoyaltyUsageWhereInput | boolean
    connect?: LoyaltyUsageWhereUniqueInput
    update?: XOR<XOR<LoyaltyUsageUpdateToOneWithWhereWithoutAppointmentInput, LoyaltyUsageUpdateWithoutAppointmentInput>, LoyaltyUsageUncheckedUpdateWithoutAppointmentInput>
  }

  export type LoyaltyUsageUncheckedUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutAppointmentInput
    upsert?: LoyaltyUsageUpsertWithoutAppointmentInput
    disconnect?: LoyaltyUsageWhereInput | boolean
    delete?: LoyaltyUsageWhereInput | boolean
    connect?: LoyaltyUsageWhereUniqueInput
    update?: XOR<XOR<LoyaltyUsageUpdateToOneWithWhereWithoutAppointmentInput, LoyaltyUsageUpdateWithoutAppointmentInput>, LoyaltyUsageUncheckedUpdateWithoutAppointmentInput>
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type LoyaltyCardCreateNestedManyWithoutLoyaltyProgramInput = {
    create?: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput> | LoyaltyCardCreateWithoutLoyaltyProgramInput[] | LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput[]
    connectOrCreate?: LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput | LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput[]
    createMany?: LoyaltyCardCreateManyLoyaltyProgramInputEnvelope
    connect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
  }

  export type LoyaltyCardUncheckedCreateNestedManyWithoutLoyaltyProgramInput = {
    create?: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput> | LoyaltyCardCreateWithoutLoyaltyProgramInput[] | LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput[]
    connectOrCreate?: LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput | LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput[]
    createMany?: LoyaltyCardCreateManyLoyaltyProgramInputEnvelope
    connect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
  }

  export type LoyaltyCardUpdateManyWithoutLoyaltyProgramNestedInput = {
    create?: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput> | LoyaltyCardCreateWithoutLoyaltyProgramInput[] | LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput[]
    connectOrCreate?: LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput | LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput[]
    upsert?: LoyaltyCardUpsertWithWhereUniqueWithoutLoyaltyProgramInput | LoyaltyCardUpsertWithWhereUniqueWithoutLoyaltyProgramInput[]
    createMany?: LoyaltyCardCreateManyLoyaltyProgramInputEnvelope
    set?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    disconnect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    delete?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    connect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    update?: LoyaltyCardUpdateWithWhereUniqueWithoutLoyaltyProgramInput | LoyaltyCardUpdateWithWhereUniqueWithoutLoyaltyProgramInput[]
    updateMany?: LoyaltyCardUpdateManyWithWhereWithoutLoyaltyProgramInput | LoyaltyCardUpdateManyWithWhereWithoutLoyaltyProgramInput[]
    deleteMany?: LoyaltyCardScalarWhereInput | LoyaltyCardScalarWhereInput[]
  }

  export type LoyaltyCardUncheckedUpdateManyWithoutLoyaltyProgramNestedInput = {
    create?: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput> | LoyaltyCardCreateWithoutLoyaltyProgramInput[] | LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput[]
    connectOrCreate?: LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput | LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput[]
    upsert?: LoyaltyCardUpsertWithWhereUniqueWithoutLoyaltyProgramInput | LoyaltyCardUpsertWithWhereUniqueWithoutLoyaltyProgramInput[]
    createMany?: LoyaltyCardCreateManyLoyaltyProgramInputEnvelope
    set?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    disconnect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    delete?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    connect?: LoyaltyCardWhereUniqueInput | LoyaltyCardWhereUniqueInput[]
    update?: LoyaltyCardUpdateWithWhereUniqueWithoutLoyaltyProgramInput | LoyaltyCardUpdateWithWhereUniqueWithoutLoyaltyProgramInput[]
    updateMany?: LoyaltyCardUpdateManyWithWhereWithoutLoyaltyProgramInput | LoyaltyCardUpdateManyWithWhereWithoutLoyaltyProgramInput[]
    deleteMany?: LoyaltyCardScalarWhereInput | LoyaltyCardScalarWhereInput[]
  }

  export type LoyaltyProgramCreateNestedOneWithoutCardsInput = {
    create?: XOR<LoyaltyProgramCreateWithoutCardsInput, LoyaltyProgramUncheckedCreateWithoutCardsInput>
    connectOrCreate?: LoyaltyProgramCreateOrConnectWithoutCardsInput
    connect?: LoyaltyProgramWhereUniqueInput
  }

  export type LoyaltyProgramUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<LoyaltyProgramCreateWithoutCardsInput, LoyaltyProgramUncheckedCreateWithoutCardsInput>
    connectOrCreate?: LoyaltyProgramCreateOrConnectWithoutCardsInput
    upsert?: LoyaltyProgramUpsertWithoutCardsInput
    connect?: LoyaltyProgramWhereUniqueInput
    update?: XOR<XOR<LoyaltyProgramUpdateToOneWithWhereWithoutCardsInput, LoyaltyProgramUpdateWithoutCardsInput>, LoyaltyProgramUncheckedUpdateWithoutCardsInput>
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type LoyaltyPlanItemCreateNestedManyWithoutPlanInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput> | LoyaltyPlanItemCreateWithoutPlanInput[] | LoyaltyPlanItemUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutPlanInput | LoyaltyPlanItemCreateOrConnectWithoutPlanInput[]
    createMany?: LoyaltyPlanItemCreateManyPlanInputEnvelope
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
  }

  export type LoyaltySubscriptionCreateNestedManyWithoutPlanInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput> | LoyaltySubscriptionCreateWithoutPlanInput[] | LoyaltySubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutPlanInput | LoyaltySubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: LoyaltySubscriptionCreateManyPlanInputEnvelope
    connect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
  }

  export type LoyaltyPlanItemUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput> | LoyaltyPlanItemCreateWithoutPlanInput[] | LoyaltyPlanItemUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutPlanInput | LoyaltyPlanItemCreateOrConnectWithoutPlanInput[]
    createMany?: LoyaltyPlanItemCreateManyPlanInputEnvelope
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
  }

  export type LoyaltySubscriptionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput> | LoyaltySubscriptionCreateWithoutPlanInput[] | LoyaltySubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutPlanInput | LoyaltySubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: LoyaltySubscriptionCreateManyPlanInputEnvelope
    connect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
  }

  export type EnumLoyaltyPlanIntervalFieldUpdateOperationsInput = {
    set?: $Enums.LoyaltyPlanInterval
  }

  export type LoyaltyPlanItemUpdateManyWithoutPlanNestedInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput> | LoyaltyPlanItemCreateWithoutPlanInput[] | LoyaltyPlanItemUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutPlanInput | LoyaltyPlanItemCreateOrConnectWithoutPlanInput[]
    upsert?: LoyaltyPlanItemUpsertWithWhereUniqueWithoutPlanInput | LoyaltyPlanItemUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: LoyaltyPlanItemCreateManyPlanInputEnvelope
    set?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    disconnect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    delete?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    update?: LoyaltyPlanItemUpdateWithWhereUniqueWithoutPlanInput | LoyaltyPlanItemUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: LoyaltyPlanItemUpdateManyWithWhereWithoutPlanInput | LoyaltyPlanItemUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
  }

  export type LoyaltySubscriptionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput> | LoyaltySubscriptionCreateWithoutPlanInput[] | LoyaltySubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutPlanInput | LoyaltySubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: LoyaltySubscriptionUpsertWithWhereUniqueWithoutPlanInput | LoyaltySubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: LoyaltySubscriptionCreateManyPlanInputEnvelope
    set?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    disconnect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    delete?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    connect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    update?: LoyaltySubscriptionUpdateWithWhereUniqueWithoutPlanInput | LoyaltySubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: LoyaltySubscriptionUpdateManyWithWhereWithoutPlanInput | LoyaltySubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: LoyaltySubscriptionScalarWhereInput | LoyaltySubscriptionScalarWhereInput[]
  }

  export type LoyaltyPlanItemUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput> | LoyaltyPlanItemCreateWithoutPlanInput[] | LoyaltyPlanItemUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltyPlanItemCreateOrConnectWithoutPlanInput | LoyaltyPlanItemCreateOrConnectWithoutPlanInput[]
    upsert?: LoyaltyPlanItemUpsertWithWhereUniqueWithoutPlanInput | LoyaltyPlanItemUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: LoyaltyPlanItemCreateManyPlanInputEnvelope
    set?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    disconnect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    delete?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    connect?: LoyaltyPlanItemWhereUniqueInput | LoyaltyPlanItemWhereUniqueInput[]
    update?: LoyaltyPlanItemUpdateWithWhereUniqueWithoutPlanInput | LoyaltyPlanItemUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: LoyaltyPlanItemUpdateManyWithWhereWithoutPlanInput | LoyaltyPlanItemUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
  }

  export type LoyaltySubscriptionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput> | LoyaltySubscriptionCreateWithoutPlanInput[] | LoyaltySubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutPlanInput | LoyaltySubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: LoyaltySubscriptionUpsertWithWhereUniqueWithoutPlanInput | LoyaltySubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: LoyaltySubscriptionCreateManyPlanInputEnvelope
    set?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    disconnect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    delete?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    connect?: LoyaltySubscriptionWhereUniqueInput | LoyaltySubscriptionWhereUniqueInput[]
    update?: LoyaltySubscriptionUpdateWithWhereUniqueWithoutPlanInput | LoyaltySubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: LoyaltySubscriptionUpdateManyWithWhereWithoutPlanInput | LoyaltySubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: LoyaltySubscriptionScalarWhereInput | LoyaltySubscriptionScalarWhereInput[]
  }

  export type LoyaltyPlanItemCreateallowedDaysInput = {
    set: number[]
  }

  export type LoyaltyPlanCreateNestedOneWithoutItemsInput = {
    create?: XOR<LoyaltyPlanCreateWithoutItemsInput, LoyaltyPlanUncheckedCreateWithoutItemsInput>
    connectOrCreate?: LoyaltyPlanCreateOrConnectWithoutItemsInput
    connect?: LoyaltyPlanWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutLoyaltyPlanItemsInput = {
    create?: XOR<ServiceCreateWithoutLoyaltyPlanItemsInput, ServiceUncheckedCreateWithoutLoyaltyPlanItemsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutLoyaltyPlanItemsInput
    connect?: ServiceWhereUniqueInput
  }

  export type LoyaltyPlanItemUpdateallowedDaysInput = {
    set?: number[]
    push?: number | number[]
  }

  export type LoyaltyPlanUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<LoyaltyPlanCreateWithoutItemsInput, LoyaltyPlanUncheckedCreateWithoutItemsInput>
    connectOrCreate?: LoyaltyPlanCreateOrConnectWithoutItemsInput
    upsert?: LoyaltyPlanUpsertWithoutItemsInput
    connect?: LoyaltyPlanWhereUniqueInput
    update?: XOR<XOR<LoyaltyPlanUpdateToOneWithWhereWithoutItemsInput, LoyaltyPlanUpdateWithoutItemsInput>, LoyaltyPlanUncheckedUpdateWithoutItemsInput>
  }

  export type ServiceUpdateOneRequiredWithoutLoyaltyPlanItemsNestedInput = {
    create?: XOR<ServiceCreateWithoutLoyaltyPlanItemsInput, ServiceUncheckedCreateWithoutLoyaltyPlanItemsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutLoyaltyPlanItemsInput
    upsert?: ServiceUpsertWithoutLoyaltyPlanItemsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutLoyaltyPlanItemsInput, ServiceUpdateWithoutLoyaltyPlanItemsInput>, ServiceUncheckedUpdateWithoutLoyaltyPlanItemsInput>
  }

  export type LoyaltyPlanCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<LoyaltyPlanCreateWithoutSubscriptionsInput, LoyaltyPlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: LoyaltyPlanCreateOrConnectWithoutSubscriptionsInput
    connect?: LoyaltyPlanWhereUniqueInput
  }

  export type LoyaltyUsageCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput> | LoyaltyUsageCreateWithoutSubscriptionInput[] | LoyaltyUsageUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutSubscriptionInput | LoyaltyUsageCreateOrConnectWithoutSubscriptionInput[]
    createMany?: LoyaltyUsageCreateManySubscriptionInputEnvelope
    connect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
  }

  export type LoyaltyUsageUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput> | LoyaltyUsageCreateWithoutSubscriptionInput[] | LoyaltyUsageUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutSubscriptionInput | LoyaltyUsageCreateOrConnectWithoutSubscriptionInput[]
    createMany?: LoyaltyUsageCreateManySubscriptionInputEnvelope
    connect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LoyaltyPlanUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<LoyaltyPlanCreateWithoutSubscriptionsInput, LoyaltyPlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: LoyaltyPlanCreateOrConnectWithoutSubscriptionsInput
    upsert?: LoyaltyPlanUpsertWithoutSubscriptionsInput
    connect?: LoyaltyPlanWhereUniqueInput
    update?: XOR<XOR<LoyaltyPlanUpdateToOneWithWhereWithoutSubscriptionsInput, LoyaltyPlanUpdateWithoutSubscriptionsInput>, LoyaltyPlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type LoyaltyUsageUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput> | LoyaltyUsageCreateWithoutSubscriptionInput[] | LoyaltyUsageUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutSubscriptionInput | LoyaltyUsageCreateOrConnectWithoutSubscriptionInput[]
    upsert?: LoyaltyUsageUpsertWithWhereUniqueWithoutSubscriptionInput | LoyaltyUsageUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: LoyaltyUsageCreateManySubscriptionInputEnvelope
    set?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    disconnect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    delete?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    connect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    update?: LoyaltyUsageUpdateWithWhereUniqueWithoutSubscriptionInput | LoyaltyUsageUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: LoyaltyUsageUpdateManyWithWhereWithoutSubscriptionInput | LoyaltyUsageUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: LoyaltyUsageScalarWhereInput | LoyaltyUsageScalarWhereInput[]
  }

  export type LoyaltyUsageUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput> | LoyaltyUsageCreateWithoutSubscriptionInput[] | LoyaltyUsageUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: LoyaltyUsageCreateOrConnectWithoutSubscriptionInput | LoyaltyUsageCreateOrConnectWithoutSubscriptionInput[]
    upsert?: LoyaltyUsageUpsertWithWhereUniqueWithoutSubscriptionInput | LoyaltyUsageUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: LoyaltyUsageCreateManySubscriptionInputEnvelope
    set?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    disconnect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    delete?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    connect?: LoyaltyUsageWhereUniqueInput | LoyaltyUsageWhereUniqueInput[]
    update?: LoyaltyUsageUpdateWithWhereUniqueWithoutSubscriptionInput | LoyaltyUsageUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: LoyaltyUsageUpdateManyWithWhereWithoutSubscriptionInput | LoyaltyUsageUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: LoyaltyUsageScalarWhereInput | LoyaltyUsageScalarWhereInput[]
  }

  export type LoyaltySubscriptionCreateNestedOneWithoutUsagesInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutUsagesInput, LoyaltySubscriptionUncheckedCreateWithoutUsagesInput>
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutUsagesInput
    connect?: LoyaltySubscriptionWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutLoyaltyUsageInput = {
    create?: XOR<AppointmentCreateWithoutLoyaltyUsageInput, AppointmentUncheckedCreateWithoutLoyaltyUsageInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutLoyaltyUsageInput
    connect?: AppointmentWhereUniqueInput
  }

  export type LoyaltySubscriptionUpdateOneRequiredWithoutUsagesNestedInput = {
    create?: XOR<LoyaltySubscriptionCreateWithoutUsagesInput, LoyaltySubscriptionUncheckedCreateWithoutUsagesInput>
    connectOrCreate?: LoyaltySubscriptionCreateOrConnectWithoutUsagesInput
    upsert?: LoyaltySubscriptionUpsertWithoutUsagesInput
    connect?: LoyaltySubscriptionWhereUniqueInput
    update?: XOR<XOR<LoyaltySubscriptionUpdateToOneWithWhereWithoutUsagesInput, LoyaltySubscriptionUpdateWithoutUsagesInput>, LoyaltySubscriptionUncheckedUpdateWithoutUsagesInput>
  }

  export type AppointmentUpdateOneRequiredWithoutLoyaltyUsageNestedInput = {
    create?: XOR<AppointmentCreateWithoutLoyaltyUsageInput, AppointmentUncheckedCreateWithoutLoyaltyUsageInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutLoyaltyUsageInput
    upsert?: AppointmentUpsertWithoutLoyaltyUsageInput
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutLoyaltyUsageInput, AppointmentUpdateWithoutLoyaltyUsageInput>, AppointmentUncheckedUpdateWithoutLoyaltyUsageInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyPlanInterval | EnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel> | $Enums.LoyaltyPlanInterval
  }

  export type NestedEnumLoyaltyPlanIntervalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoyaltyPlanInterval | EnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    in?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoyaltyPlanInterval[] | ListEnumLoyaltyPlanIntervalFieldRefInput<$PrismaModel>
    not?: NestedEnumLoyaltyPlanIntervalWithAggregatesFilter<$PrismaModel> | $Enums.LoyaltyPlanInterval
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel>
    _max?: NestedEnumLoyaltyPlanIntervalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AppointmentCreateWithoutServiceInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyUsage?: LoyaltyUsageCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutServiceInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyUsage?: LoyaltyUsageUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentCreateManyServiceInputEnvelope = {
    data: AppointmentCreateManyServiceInput | AppointmentCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltyPlanItemCreateWithoutServiceInput = {
    id?: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: LoyaltyPlanCreateNestedOneWithoutItemsInput
  }

  export type LoyaltyPlanItemUncheckedCreateWithoutServiceInput = {
    id?: string
    planId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemCreateOrConnectWithoutServiceInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    create: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput>
  }

  export type LoyaltyPlanItemCreateManyServiceInputEnvelope = {
    data: LoyaltyPlanItemCreateManyServiceInput | LoyaltyPlanItemCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentUpsertWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutServiceInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutServiceInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    tenantId?: StringFilter<"Appointment"> | string
    tenantSlug?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    additionalServiceIds?: StringNullableListFilter<"Appointment">
    userId?: StringNullableFilter<"Appointment"> | string | null
    barberId?: StringNullableFilter<"Appointment"> | string | null
    barberName?: StringNullableFilter<"Appointment"> | string | null
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringNullableFilter<"Appointment"> | string | null
    clientPhone?: StringNullableFilter<"Appointment"> | string | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    paymentIntentId?: StringNullableFilter<"Appointment"> | string | null
    platformFee?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    netAmount?: DecimalNullableFilter<"Appointment"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    bookingSource?: StringNullableFilter<"Appointment"> | string | null
    holdKind?: StringFilter<"Appointment"> | string
    holdReason?: StringNullableFilter<"Appointment"> | string | null
    comandaLines?: JsonNullableFilter<"Appointment">
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type LoyaltyPlanItemUpsertWithWhereUniqueWithoutServiceInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    update: XOR<LoyaltyPlanItemUpdateWithoutServiceInput, LoyaltyPlanItemUncheckedUpdateWithoutServiceInput>
    create: XOR<LoyaltyPlanItemCreateWithoutServiceInput, LoyaltyPlanItemUncheckedCreateWithoutServiceInput>
  }

  export type LoyaltyPlanItemUpdateWithWhereUniqueWithoutServiceInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    data: XOR<LoyaltyPlanItemUpdateWithoutServiceInput, LoyaltyPlanItemUncheckedUpdateWithoutServiceInput>
  }

  export type LoyaltyPlanItemUpdateManyWithWhereWithoutServiceInput = {
    where: LoyaltyPlanItemScalarWhereInput
    data: XOR<LoyaltyPlanItemUpdateManyMutationInput, LoyaltyPlanItemUncheckedUpdateManyWithoutServiceInput>
  }

  export type LoyaltyPlanItemScalarWhereInput = {
    AND?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
    OR?: LoyaltyPlanItemScalarWhereInput[]
    NOT?: LoyaltyPlanItemScalarWhereInput | LoyaltyPlanItemScalarWhereInput[]
    id?: StringFilter<"LoyaltyPlanItem"> | string
    planId?: StringFilter<"LoyaltyPlanItem"> | string
    serviceId?: StringFilter<"LoyaltyPlanItem"> | string
    quantity?: IntFilter<"LoyaltyPlanItem"> | number
    allowedDays?: IntNullableListFilter<"LoyaltyPlanItem">
    createdAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyPlanItem"> | Date | string
  }

  export type ServiceCreateWithoutAppointmentsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyPlanItems?: LoyaltyPlanItemCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loyaltyPlanItems?: LoyaltyPlanItemUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutAppointmentsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
  }

  export type LoyaltyUsageCreateWithoutAppointmentInput = {
    id?: string
    usedAt?: Date | string
    subscription: LoyaltySubscriptionCreateNestedOneWithoutUsagesInput
  }

  export type LoyaltyUsageUncheckedCreateWithoutAppointmentInput = {
    id?: string
    subscriptionId: string
    usedAt?: Date | string
  }

  export type LoyaltyUsageCreateOrConnectWithoutAppointmentInput = {
    where: LoyaltyUsageWhereUniqueInput
    create: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
  }

  export type ServiceUpsertWithoutAppointmentsInput = {
    update: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyPlanItems?: LoyaltyPlanItemUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyPlanItems?: LoyaltyPlanItemUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type LoyaltyUsageUpsertWithoutAppointmentInput = {
    update: XOR<LoyaltyUsageUpdateWithoutAppointmentInput, LoyaltyUsageUncheckedUpdateWithoutAppointmentInput>
    create: XOR<LoyaltyUsageCreateWithoutAppointmentInput, LoyaltyUsageUncheckedCreateWithoutAppointmentInput>
    where?: LoyaltyUsageWhereInput
  }

  export type LoyaltyUsageUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: LoyaltyUsageWhereInput
    data: XOR<LoyaltyUsageUpdateWithoutAppointmentInput, LoyaltyUsageUncheckedUpdateWithoutAppointmentInput>
  }

  export type LoyaltyUsageUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: LoyaltySubscriptionUpdateOneRequiredWithoutUsagesNestedInput
  }

  export type LoyaltyUsageUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardCreateWithoutLoyaltyProgramInput = {
    id?: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput = {
    id?: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyCardCreateOrConnectWithoutLoyaltyProgramInput = {
    where: LoyaltyCardWhereUniqueInput
    create: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput>
  }

  export type LoyaltyCardCreateManyLoyaltyProgramInputEnvelope = {
    data: LoyaltyCardCreateManyLoyaltyProgramInput | LoyaltyCardCreateManyLoyaltyProgramInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltyCardUpsertWithWhereUniqueWithoutLoyaltyProgramInput = {
    where: LoyaltyCardWhereUniqueInput
    update: XOR<LoyaltyCardUpdateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedUpdateWithoutLoyaltyProgramInput>
    create: XOR<LoyaltyCardCreateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedCreateWithoutLoyaltyProgramInput>
  }

  export type LoyaltyCardUpdateWithWhereUniqueWithoutLoyaltyProgramInput = {
    where: LoyaltyCardWhereUniqueInput
    data: XOR<LoyaltyCardUpdateWithoutLoyaltyProgramInput, LoyaltyCardUncheckedUpdateWithoutLoyaltyProgramInput>
  }

  export type LoyaltyCardUpdateManyWithWhereWithoutLoyaltyProgramInput = {
    where: LoyaltyCardScalarWhereInput
    data: XOR<LoyaltyCardUpdateManyMutationInput, LoyaltyCardUncheckedUpdateManyWithoutLoyaltyProgramInput>
  }

  export type LoyaltyCardScalarWhereInput = {
    AND?: LoyaltyCardScalarWhereInput | LoyaltyCardScalarWhereInput[]
    OR?: LoyaltyCardScalarWhereInput[]
    NOT?: LoyaltyCardScalarWhereInput | LoyaltyCardScalarWhereInput[]
    id?: StringFilter<"LoyaltyCard"> | string
    loyaltyProgramId?: StringFilter<"LoyaltyCard"> | string
    userId?: StringFilter<"LoyaltyCard"> | string
    points?: IntFilter<"LoyaltyCard"> | number
    createdAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltyCard"> | Date | string
  }

  export type LoyaltyProgramCreateWithoutCardsInput = {
    id?: string
    tenantId: string
    name: string
    pointsRequired?: number
    reward: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyProgramUncheckedCreateWithoutCardsInput = {
    id?: string
    tenantId: string
    name: string
    pointsRequired?: number
    reward: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyProgramCreateOrConnectWithoutCardsInput = {
    where: LoyaltyProgramWhereUniqueInput
    create: XOR<LoyaltyProgramCreateWithoutCardsInput, LoyaltyProgramUncheckedCreateWithoutCardsInput>
  }

  export type LoyaltyProgramUpsertWithoutCardsInput = {
    update: XOR<LoyaltyProgramUpdateWithoutCardsInput, LoyaltyProgramUncheckedUpdateWithoutCardsInput>
    create: XOR<LoyaltyProgramCreateWithoutCardsInput, LoyaltyProgramUncheckedCreateWithoutCardsInput>
    where?: LoyaltyProgramWhereInput
  }

  export type LoyaltyProgramUpdateToOneWithWhereWithoutCardsInput = {
    where?: LoyaltyProgramWhereInput
    data: XOR<LoyaltyProgramUpdateWithoutCardsInput, LoyaltyProgramUncheckedUpdateWithoutCardsInput>
  }

  export type LoyaltyProgramUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyProgramUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pointsRequired?: IntFieldUpdateOperationsInput | number
    reward?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemCreateWithoutPlanInput = {
    id?: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutLoyaltyPlanItemsInput
  }

  export type LoyaltyPlanItemUncheckedCreateWithoutPlanInput = {
    id?: string
    serviceId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemCreateOrConnectWithoutPlanInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    create: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput>
  }

  export type LoyaltyPlanItemCreateManyPlanInputEnvelope = {
    data: LoyaltyPlanItemCreateManyPlanInput | LoyaltyPlanItemCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltySubscriptionCreateWithoutPlanInput = {
    id?: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usages?: LoyaltyUsageCreateNestedManyWithoutSubscriptionInput
  }

  export type LoyaltySubscriptionUncheckedCreateWithoutPlanInput = {
    id?: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usages?: LoyaltyUsageUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type LoyaltySubscriptionCreateOrConnectWithoutPlanInput = {
    where: LoyaltySubscriptionWhereUniqueInput
    create: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type LoyaltySubscriptionCreateManyPlanInputEnvelope = {
    data: LoyaltySubscriptionCreateManyPlanInput | LoyaltySubscriptionCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltyPlanItemUpsertWithWhereUniqueWithoutPlanInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    update: XOR<LoyaltyPlanItemUpdateWithoutPlanInput, LoyaltyPlanItemUncheckedUpdateWithoutPlanInput>
    create: XOR<LoyaltyPlanItemCreateWithoutPlanInput, LoyaltyPlanItemUncheckedCreateWithoutPlanInput>
  }

  export type LoyaltyPlanItemUpdateWithWhereUniqueWithoutPlanInput = {
    where: LoyaltyPlanItemWhereUniqueInput
    data: XOR<LoyaltyPlanItemUpdateWithoutPlanInput, LoyaltyPlanItemUncheckedUpdateWithoutPlanInput>
  }

  export type LoyaltyPlanItemUpdateManyWithWhereWithoutPlanInput = {
    where: LoyaltyPlanItemScalarWhereInput
    data: XOR<LoyaltyPlanItemUpdateManyMutationInput, LoyaltyPlanItemUncheckedUpdateManyWithoutPlanInput>
  }

  export type LoyaltySubscriptionUpsertWithWhereUniqueWithoutPlanInput = {
    where: LoyaltySubscriptionWhereUniqueInput
    update: XOR<LoyaltySubscriptionUpdateWithoutPlanInput, LoyaltySubscriptionUncheckedUpdateWithoutPlanInput>
    create: XOR<LoyaltySubscriptionCreateWithoutPlanInput, LoyaltySubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type LoyaltySubscriptionUpdateWithWhereUniqueWithoutPlanInput = {
    where: LoyaltySubscriptionWhereUniqueInput
    data: XOR<LoyaltySubscriptionUpdateWithoutPlanInput, LoyaltySubscriptionUncheckedUpdateWithoutPlanInput>
  }

  export type LoyaltySubscriptionUpdateManyWithWhereWithoutPlanInput = {
    where: LoyaltySubscriptionScalarWhereInput
    data: XOR<LoyaltySubscriptionUpdateManyMutationInput, LoyaltySubscriptionUncheckedUpdateManyWithoutPlanInput>
  }

  export type LoyaltySubscriptionScalarWhereInput = {
    AND?: LoyaltySubscriptionScalarWhereInput | LoyaltySubscriptionScalarWhereInput[]
    OR?: LoyaltySubscriptionScalarWhereInput[]
    NOT?: LoyaltySubscriptionScalarWhereInput | LoyaltySubscriptionScalarWhereInput[]
    id?: StringFilter<"LoyaltySubscription"> | string
    planId?: StringFilter<"LoyaltySubscription"> | string
    userId?: StringFilter<"LoyaltySubscription"> | string
    barberId?: StringNullableFilter<"LoyaltySubscription"> | string | null
    status?: StringFilter<"LoyaltySubscription"> | string
    startDate?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    endDate?: DateTimeNullableFilter<"LoyaltySubscription"> | Date | string | null
    createdAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
    updatedAt?: DateTimeFilter<"LoyaltySubscription"> | Date | string
  }

  export type LoyaltyPlanCreateWithoutItemsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: LoyaltySubscriptionCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanUncheckedCreateWithoutItemsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: LoyaltySubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanCreateOrConnectWithoutItemsInput = {
    where: LoyaltyPlanWhereUniqueInput
    create: XOR<LoyaltyPlanCreateWithoutItemsInput, LoyaltyPlanUncheckedCreateWithoutItemsInput>
  }

  export type ServiceCreateWithoutLoyaltyPlanItemsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutLoyaltyPlanItemsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    duration: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutLoyaltyPlanItemsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutLoyaltyPlanItemsInput, ServiceUncheckedCreateWithoutLoyaltyPlanItemsInput>
  }

  export type LoyaltyPlanUpsertWithoutItemsInput = {
    update: XOR<LoyaltyPlanUpdateWithoutItemsInput, LoyaltyPlanUncheckedUpdateWithoutItemsInput>
    create: XOR<LoyaltyPlanCreateWithoutItemsInput, LoyaltyPlanUncheckedCreateWithoutItemsInput>
    where?: LoyaltyPlanWhereInput
  }

  export type LoyaltyPlanUpdateToOneWithWhereWithoutItemsInput = {
    where?: LoyaltyPlanWhereInput
    data: XOR<LoyaltyPlanUpdateWithoutItemsInput, LoyaltyPlanUncheckedUpdateWithoutItemsInput>
  }

  export type LoyaltyPlanUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: LoyaltySubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type LoyaltyPlanUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: LoyaltySubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ServiceUpsertWithoutLoyaltyPlanItemsInput = {
    update: XOR<ServiceUpdateWithoutLoyaltyPlanItemsInput, ServiceUncheckedUpdateWithoutLoyaltyPlanItemsInput>
    create: XOR<ServiceCreateWithoutLoyaltyPlanItemsInput, ServiceUncheckedCreateWithoutLoyaltyPlanItemsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutLoyaltyPlanItemsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutLoyaltyPlanItemsInput, ServiceUncheckedUpdateWithoutLoyaltyPlanItemsInput>
  }

  export type ServiceUpdateWithoutLoyaltyPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutLoyaltyPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duration?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type LoyaltyPlanCreateWithoutSubscriptionsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LoyaltyPlanItemCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    interval?: $Enums.LoyaltyPlanInterval
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LoyaltyPlanItemUncheckedCreateNestedManyWithoutPlanInput
  }

  export type LoyaltyPlanCreateOrConnectWithoutSubscriptionsInput = {
    where: LoyaltyPlanWhereUniqueInput
    create: XOR<LoyaltyPlanCreateWithoutSubscriptionsInput, LoyaltyPlanUncheckedCreateWithoutSubscriptionsInput>
  }

  export type LoyaltyUsageCreateWithoutSubscriptionInput = {
    id?: string
    usedAt?: Date | string
    appointment: AppointmentCreateNestedOneWithoutLoyaltyUsageInput
  }

  export type LoyaltyUsageUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    appointmentId: string
    usedAt?: Date | string
  }

  export type LoyaltyUsageCreateOrConnectWithoutSubscriptionInput = {
    where: LoyaltyUsageWhereUniqueInput
    create: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput>
  }

  export type LoyaltyUsageCreateManySubscriptionInputEnvelope = {
    data: LoyaltyUsageCreateManySubscriptionInput | LoyaltyUsageCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type LoyaltyPlanUpsertWithoutSubscriptionsInput = {
    update: XOR<LoyaltyPlanUpdateWithoutSubscriptionsInput, LoyaltyPlanUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<LoyaltyPlanCreateWithoutSubscriptionsInput, LoyaltyPlanUncheckedCreateWithoutSubscriptionsInput>
    where?: LoyaltyPlanWhereInput
  }

  export type LoyaltyPlanUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: LoyaltyPlanWhereInput
    data: XOR<LoyaltyPlanUpdateWithoutSubscriptionsInput, LoyaltyPlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type LoyaltyPlanUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LoyaltyPlanItemUpdateManyWithoutPlanNestedInput
  }

  export type LoyaltyPlanUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: EnumLoyaltyPlanIntervalFieldUpdateOperationsInput | $Enums.LoyaltyPlanInterval
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LoyaltyPlanItemUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type LoyaltyUsageUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: LoyaltyUsageWhereUniqueInput
    update: XOR<LoyaltyUsageUpdateWithoutSubscriptionInput, LoyaltyUsageUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<LoyaltyUsageCreateWithoutSubscriptionInput, LoyaltyUsageUncheckedCreateWithoutSubscriptionInput>
  }

  export type LoyaltyUsageUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: LoyaltyUsageWhereUniqueInput
    data: XOR<LoyaltyUsageUpdateWithoutSubscriptionInput, LoyaltyUsageUncheckedUpdateWithoutSubscriptionInput>
  }

  export type LoyaltyUsageUpdateManyWithWhereWithoutSubscriptionInput = {
    where: LoyaltyUsageScalarWhereInput
    data: XOR<LoyaltyUsageUpdateManyMutationInput, LoyaltyUsageUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type LoyaltyUsageScalarWhereInput = {
    AND?: LoyaltyUsageScalarWhereInput | LoyaltyUsageScalarWhereInput[]
    OR?: LoyaltyUsageScalarWhereInput[]
    NOT?: LoyaltyUsageScalarWhereInput | LoyaltyUsageScalarWhereInput[]
    id?: StringFilter<"LoyaltyUsage"> | string
    subscriptionId?: StringFilter<"LoyaltyUsage"> | string
    appointmentId?: StringFilter<"LoyaltyUsage"> | string
    usedAt?: DateTimeFilter<"LoyaltyUsage"> | Date | string
  }

  export type LoyaltySubscriptionCreateWithoutUsagesInput = {
    id?: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: LoyaltyPlanCreateNestedOneWithoutSubscriptionsInput
  }

  export type LoyaltySubscriptionUncheckedCreateWithoutUsagesInput = {
    id?: string
    planId: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltySubscriptionCreateOrConnectWithoutUsagesInput = {
    where: LoyaltySubscriptionWhereUniqueInput
    create: XOR<LoyaltySubscriptionCreateWithoutUsagesInput, LoyaltySubscriptionUncheckedCreateWithoutUsagesInput>
  }

  export type AppointmentCreateWithoutLoyaltyUsageInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutLoyaltyUsageInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    serviceId: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutLoyaltyUsageInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutLoyaltyUsageInput, AppointmentUncheckedCreateWithoutLoyaltyUsageInput>
  }

  export type LoyaltySubscriptionUpsertWithoutUsagesInput = {
    update: XOR<LoyaltySubscriptionUpdateWithoutUsagesInput, LoyaltySubscriptionUncheckedUpdateWithoutUsagesInput>
    create: XOR<LoyaltySubscriptionCreateWithoutUsagesInput, LoyaltySubscriptionUncheckedCreateWithoutUsagesInput>
    where?: LoyaltySubscriptionWhereInput
  }

  export type LoyaltySubscriptionUpdateToOneWithWhereWithoutUsagesInput = {
    where?: LoyaltySubscriptionWhereInput
    data: XOR<LoyaltySubscriptionUpdateWithoutUsagesInput, LoyaltySubscriptionUncheckedUpdateWithoutUsagesInput>
  }

  export type LoyaltySubscriptionUpdateWithoutUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: LoyaltyPlanUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type LoyaltySubscriptionUncheckedUpdateWithoutUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpsertWithoutLoyaltyUsageInput = {
    update: XOR<AppointmentUpdateWithoutLoyaltyUsageInput, AppointmentUncheckedUpdateWithoutLoyaltyUsageInput>
    create: XOR<AppointmentCreateWithoutLoyaltyUsageInput, AppointmentUncheckedCreateWithoutLoyaltyUsageInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutLoyaltyUsageInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutLoyaltyUsageInput, AppointmentUncheckedUpdateWithoutLoyaltyUsageInput>
  }

  export type AppointmentUpdateWithoutLoyaltyUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutLoyaltyUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyServiceInput = {
    id?: string
    tenantId: string
    tenantSlug: string
    additionalServiceIds?: AppointmentCreateadditionalServiceIdsInput | string[]
    userId?: string | null
    barberId?: string | null
    barberName?: string | null
    clientName: string
    clientEmail?: string | null
    clientPhone?: string | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    type?: $Enums.AppointmentType
    paymentIntentId?: string | null
    platformFee?: Decimal | DecimalJsLike | number | string | null
    netAmount?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    bookingSource?: string | null
    holdKind?: string
    holdReason?: string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemCreateManyServiceInput = {
    id?: string
    planId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyUsage?: LoyaltyUsageUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loyaltyUsage?: LoyaltyUsageUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    tenantSlug?: StringFieldUpdateOperationsInput | string
    additionalServiceIds?: AppointmentUpdateadditionalServiceIdsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    barberName?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    clientPhone?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    platformFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    netAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSource?: NullableStringFieldUpdateOperationsInput | string | null
    holdKind?: StringFieldUpdateOperationsInput | string
    holdReason?: NullableStringFieldUpdateOperationsInput | string | null
    comandaLines?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: LoyaltyPlanUpdateOneRequiredWithoutItemsNestedInput
  }

  export type LoyaltyPlanItemUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardCreateManyLoyaltyProgramInput = {
    id?: string
    userId: string
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyCardUpdateWithoutLoyaltyProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardUncheckedUpdateWithoutLoyaltyProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyCardUncheckedUpdateManyWithoutLoyaltyProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemCreateManyPlanInput = {
    id?: string
    serviceId: string
    quantity: number
    allowedDays?: LoyaltyPlanItemCreateallowedDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltySubscriptionCreateManyPlanInput = {
    id?: string
    userId: string
    barberId?: string | null
    status?: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoyaltyPlanItemUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutLoyaltyPlanItemsNestedInput
  }

  export type LoyaltyPlanItemUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyPlanItemUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    allowedDays?: LoyaltyPlanItemUpdateallowedDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltySubscriptionUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usages?: LoyaltyUsageUpdateManyWithoutSubscriptionNestedInput
  }

  export type LoyaltySubscriptionUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usages?: LoyaltyUsageUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type LoyaltySubscriptionUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    barberId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyUsageCreateManySubscriptionInput = {
    id?: string
    appointmentId: string
    usedAt?: Date | string
  }

  export type LoyaltyUsageUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneRequiredWithoutLoyaltyUsageNestedInput
  }

  export type LoyaltyUsageUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoyaltyUsageUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}