import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Spot } from 'src/spots/spots.model';

interface TransportCreationAttrs {
  plate: string;
  type: number;
}

@Table({ tableName: 'transports' })
export class Transport extends Model<Transport, TransportCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  plate: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @ForeignKey(() => Spot)
  spotId: number;

  @BelongsTo(() => Spot)
  spot: Spot;
}
