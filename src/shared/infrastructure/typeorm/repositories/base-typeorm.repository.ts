import { DataSource, EntitySchema, ObjectLiteral, QueryRunner, Repository } from 'typeorm';

export class BaseTypeOrmRepository<Entity extends ObjectLiteral> {
  readonly dataSource: DataSource;
  readonly repository: Repository<Entity>;
  readonly queryRunner?: QueryRunner;
  readonly entitySchema: EntitySchema<Entity>;

  constructor(dataSource: DataSource, entity: EntitySchema<Entity>) {
    this.dataSource = dataSource;
    this.repository = dataSource.getRepository(entity);
    this.queryRunner = dataSource.createQueryRunner();
    this.entitySchema = entity;
  }

  getConnection(): DataSource {
    return this.dataSource;
  }
}
