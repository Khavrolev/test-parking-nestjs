import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Transport } from 'src/transports/transports.model';

export interface SpotCreationAttrs {
  size: number;
}

@Table({ tableName: 'spots' })
export class Spot extends Model<Spot, SpotCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  size: number;

  @HasMany(() => Transport)
  transports: Transport[];
}
